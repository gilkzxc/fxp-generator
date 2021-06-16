import {
    StandardTextFieldProps,
    TextField,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ForumData } from '../../../API';

import ImgPreview from '../../../containers/ImgPreview/ImgPreview';
import { OptionType } from '../../../Data';

interface InputProps extends StandardTextFieldProps {
    name: string;
    value: any;
    onChange: ( ...args: any ) => void;
    hint?: any;
    autoCompleteOptions?: ForumData[];
    onAutoCompleteChange?: ( data: ForumData | any ) => void;
    selectOptions?: OptionType[];
    radioOptions?: OptionType[];
}

export default function Input( props: InputProps ) {
    let jsx2Return: any;

    switch ( props.type ) {
        case 'autocomplete':
            jsx2Return = (
                <Autocomplete
                    fullWidth
                    freeSolo
                    options        = { props.autoCompleteOptions || [] }
                    getOptionLabel = { ( forum: any ) => forum.forumName }
                    onChange       = { ( e, value ) => props.onAutoCompleteChange && props.onAutoCompleteChange( value ) }
                    renderInput    = { params =>
                    <TextField
                        { ...params }
                        type       = "text"
                        name       = { props.name }
                        label      = { props.label }
                        helperText = { props.hint }
                        error      = { props.error }
                        onBlur     = { props.onBlur }
                        onChange   = { props.onChange }
                        value      = { props.value } />
                } />
            );
            break;
        case 'select':
            jsx2Return = (
                <FormControl fullWidth>
                    <InputLabel id = { props.name + '-label' }> { props.label } </InputLabel>
                    <Select
                        labelId  = { props.name + '-label' }
                        name     = { props.name }
                        value    = { props.value }
                        onChange = { props.onChange } >
                        {
                            props.selectOptions?.map( ({ label, value }) => (
                                <MenuItem
                                    key   = {value}
                                    value = {value} > {label} </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            );
            break;
        case 'radio':
            jsx2Return = (
                <FormControl style = {{ margin: 10 }}>
                    <FormLabel>{ props.label }</FormLabel>
                    <RadioGroup
                        aria-label = { props.name }
                        name       = { props.name }
                        value      = { props.value }
                        onChange   = { props.onChange } >
                        {
                            props.radioOptions?.map( ({ label, value }) => (
                                <FormControlLabel
                                    key   = { value }
                                    value   = { value }
                                    label   = { label }
                                    control = { <Radio color = "primary" /> } />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            );
            break;
    
        default:
            jsx2Return = (<>
                <TextField
                    disabled   = { props.disabled }
                    type       = { props.type }
                    name       = { props.name }
                    label      = { props.label }
                    onChange   = { props.onChange }
                    onBlur     = { props.onBlur }
                    size       = { props.size }
                    helperText = { props.hint }
                    error      = { props.error }
                    value      = { props.value }
                    fullWidth />
                    {
                        props.value && !props.error &&
                        props.name === 'forumImg' &&
                        <ImgPreview imageURL = { props.value } />
                    }
            </>);
            break;
    }

    return jsx2Return;
}
