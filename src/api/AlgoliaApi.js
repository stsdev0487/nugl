import algoliaSearch from 'algoliasearch'
import geodist from 'geodist'

const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID
const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY

const algolia = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)

const listingIndex = algolia.initIndex(
  process.env.REACT_APP_ALGOLIA_LISTING_INDEX,
)

const brandIndex = algolia.initIndex(process.env.REACT_APP_ALGOLIA_BRAND_INDEX)

const generalSearchParams = {
  hitsPerPage: '10',
  page: '0',
  analytics: 'false',
  attributesToRetrieve: '*',
  exactOnSingleWordQuery: 'word',
}

const facetMap = {
  brands: 'brands.brandId',
  brandCategories: 'brands.brandType',
}

export default class AlgoliaApi {
  static geoSearch(center, currentLocation, filters, resultsPerPage, page = 0) {
    const facets = Object.keys(filters).filter(e => filters[e].length > 0)
    const facetFilters = facets
      .map(key => {
        return filters[key].map(service => {
          return `${facetMap[key] || key}:${service}`
        })
      })
      .filter(i => i.length > 0)
    const stringFacets = `${JSON.stringify(facets)}`
    const stringFacetFilters = JSON.stringify(facetFilters)
    return listingIndex
      .search('', {
        hitsPerPage: resultsPerPage,
        page: page,
        analytics: 'false',
        attributesToRetrieve: '*',
        //insideBoundingBox: `${nw.lat},${nw.lng},${se.lat},${se.lng}`,
        //aroundLatLng: `${(nw.lat + se.lat) / 2},${(nw.lng + se.lng) / 2}`,
        aroundLatLng: `${center.lat},${center.lng}`,
        facets: `${stringFacets}`,
        facetFilters: `${stringFacetFilters}`,
      })
      .then(results => {
        if (results.hits.length > 0) {
          let hits = results.hits.map(hit => {
            return {
              id: hit.objectID,
              listing: {
                ...hit,
                id: hit.objectID,
                location: { lat: hit._geoloc.lat, lon: hit._geoloc.lng },
              },
              distance: [
                geodist(
                  { lat: currentLocation.lat, lon: currentLocation.lng },
                  { lat: hit._geoloc.lat, lon: hit._geoloc.lng },
                  { exact: true, unit: 'miles' },
                ),
              ],
            }
          })

          return hits.sort((a, b) => a.distance - b.distance)
        }

        return []
      })
  }

  static autoCompleteSearch(input, center) {
    const params = Object.assign({}, generalSearchParams, {
      aroundLatLng: `${center.lat},${center.lng}`,
    })
    const queries = [
      {
        indexName: process.env.REACT_APP_ALGOLIA_LISTING_INDEX,
        query: input,
        params,
      },
      {
        indexName: process.env.REACT_APP_ALGOLIA_BRAND_INDEX,
        query: input,
        params: generalSearchParams,
      },
    ]

    return algolia.search(queries).then(({ results }) =>
      results.map(result => {
        if (result.hits.length > 0) {
          let section = ''
          if (result.index === process.env.REACT_APP_ALGOLIA_LISTING_INDEX) {
            section = 'Places'
          }
          if (result.index === process.env.REACT_APP_ALGOLIA_BRAND_INDEX) {
            section = 'Brands'
          }
          let suggestions = result.hits.map(hit => {
            let e = {
              id: hit.objectID,
              type: hit.type,
              text: input,
              suggestion: hit.name,
              section,
              city: hit.city,
              state: hit.state,
            }
            if (hit._geoloc) {
              e.location = {
                lat: hit._geoloc.lat,
                lon: hit._geoloc.lng,
              }
            }
            return e
          })
          if (section === 'Places') {
            suggestions = suggestions.sort((l, r) => l.distance > r.distance)
          }
          return {
            section,
            suggestions,
          }
        }
        return null
      }),
    )
  }

  static searchBrands(input) {
    return brandIndex
      .search(input, {
        hitsPerPage: 3,
        analytics: 'false',
        attributesToRetrieve: ['name', 'logoUrl'],
      })
      .then(results => {
        if (results.hits.length > 0) {
          let hits = results.hits.map(hit => {
            return {
              ...hit,
              id: hit.objectID,
            }
          })
          return hits
        }
        return []
      })
  }
}
