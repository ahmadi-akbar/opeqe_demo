import React, {
    useState
} from 'react';
import cn from "classnames";

import TextField from "../TextField";

export default function(props) {
    const {
        className,
        style,
        onChange,
        location,
        match,
        history,
        label,
        staticContext,
        ...others
    } = props;

    const [val, setVal] = useState('');

    function handleChange(event) {
        const phoneInitial = event.target.value;

        let phone = phoneInitial;

        if (phoneInitial.length > val.length) {
            phone = formatPhoneNumber(
                phoneInitial
            );
        }

        if (
            phone.length > 13
        ) {
            return;
        }

        setVal(phone);
        if (onChange) {
            onChange(phone);
        }
    }

    function formatPhoneNumber(phoneNumberString) {
        const cleaned = phoneNumberString.replace(/[^0-9]/gi, '');

        let out = cleaned;

        if (cleaned.length >= 3) {
            out = `(${out.substr(0, 3)})${out.substr(3)}`;
        }
        if (cleaned.length >= 6) {
            console.log(cleaned);
            out = `${out.substr(0, 8)}-${out.substr(8)}`;;
        }

        return out;
    }

    return ( <
        TextField className = {
            cn(
                'phone-input-l1',
                className
            )
        }
        style = {
            {
                ...style
            }
        }
        inputProps = {
            {
                dir: "ltr"
            }
        }
        label = {
            label
        }
        value = {
            val
        }
        onChange = {
            handleChange
        } { ...others
        }
        />
    );
}