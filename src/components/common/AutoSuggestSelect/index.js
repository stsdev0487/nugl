import React, { PureComponent } from 'react'
import Select from 'react-select'

import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import styles from './styles'

class AutoSuggestSelect extends PureComponent {
  render() {
    const { classes, onChange, options, disabled, value } = this.props

    const NoOptionsMessage = ({ children, selectProps, innerProps }) => (
      <Typography
        disabled={disabled}
        color="textSecondary"
        className={classes.noOptionsMessage}
        {...innerProps}
      >
        {children}
      </Typography>
    )

    const Option = ({
      innerRef,
      isFocused,
      isSelected,
      innerProps,
      children,
    }) => (
      <MenuItem
        buttonRef={innerRef}
        selected={isFocused}
        component="div"
        disabled={disabled}
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
        {...innerProps}
      >
        {children}
      </MenuItem>
    )

    const inputComponent = ({ inputRef, ...props }) => (
      <div ref={inputRef} {...props} />
    )

    const Control = ({ selectProps, innerRef, children, innerProps }) => (
      <TextField
        fullWidth
        disabled={disabled}
        InputProps={{
          inputComponent,
          inputProps: {
            className: classes.input,
            inputRef: innerRef,
            children,
            ...innerProps,
          },
        }}
        {...selectProps.textFieldProps}
      />
    )

    const selectStyles = {
      input: base => ({
        ...base,
        // color: theme.palette.text.primary
      }),
    }

    const components = {
      Option,
      Control,
      NoOptionsMessage,
    }

    return (
      <Select
        // value={value}
        className={classes.select}
        styles={selectStyles}
        disabled={disabled}
        components={components}
        onChange={onChange}
        options={options}
      />
    )
  }
}

export default withStyles(styles)(AutoSuggestSelect)
