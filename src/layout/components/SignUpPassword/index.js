import React, {
    useState
} from 'react';
import cn from "classnames";
import {
    Redirect
} from "react-router-dom"

import CustomInput from '../../materialPro/components/CustomInput/CustomInput';

import Button from '../DefaultButton';
import BottomFixedContainer from "../BottomFixedContainer";
import CircularProgress from "../CircularProgress";

import {
    LOG_IN_PAGE_URL,
} from "../../config/routing";

import useReduxCallback, {
    statusCodes
} from "../../hooks/useReduxCallback";

export default function({
    className,
    onSubmit,
    phone,
    code,
    names,
    waiting,
    breakpoints,
    email,
    showForgotPass,
    location,
    forgotPassStatus,
    onForgotPass,
    onForgotPassSent
}) {

    const params = new URLSearchParams(location.search);
    const type = params.get('type');


    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');
    const [oldPass, setOldPass] = useState('');

    useReduxCallback(handleForgotPassSent, null, forgotPassStatus);

    function handleForgotPassSent() {
        if (onForgotPassSent) {
            onForgotPassSent();
        }
    }

    function onPass(event) {
        const escaped = event.target.value.substr(0, 12);
        setPass(escaped);
    }

    function onRePass(event) {
        const escaped = event.target.value.substr(0, 12);
        setRePass(escaped);
    }

    function onOldPass(event) {
        const escaped = event.target.value.substr(0, 12);
        setOldPass(escaped);
    }

    async function submit(event) {
        switch (type) {
            case 'new':
                {
                    onSubmit({
                        pass,
                        type,
                    });
                    break;
                }
            case 'existing':
                {
                    onSubmit({
                        pass: oldPass,
                        type,
                    });
                    break;
                }
            case 'both':
                {
                    onSubmit({
                        newPass: pass,
                        oldPass: oldPass,
                    });
                    break;
                }
            default:
                {
                    break;
                }

        }

    }

    if (!type) {
        return <Redirect to = {
            `/${LOG_IN_PAGE_URL()}`
        }
        />
    }

    const isBoth = type === 'both';
    const isNew = type === 'new';
    const isExisting = type === 'existing';


    const title = getTitle(type);

    const oldPassSubtitle = !oldPass ? (
        (isExisting) ? (
            "What's your password"
        ) : (
            "Please create your new password"
        )
    ) : (
        (oldPass.length < 6) ? (
            "Password must have at least 6 characters."
        ) : (
            ""
        )
    )
    const passSubtitle = !pass ? (
        "Please create your new password"
    ) : (
        (pass.length < 6) ? (
            "Password must have at least 6 characters."
        ) : (
            ""
        )
    )
    const rePassSubtitle = (rePass && (rePass !== pass)) ? ( <
        >
        Password does not match the confirm password. <
        br / >
        Try again. <
        />
    ) : (
        ""
    );

    return ( <
        div className = {
            cn(
                "sign-up-password-l1",
                className
            )
        } >
        <
        div className = "container" >
        <
        div className = "title" > {
            title
        } <
        /div>

        {
            (isBoth || isExisting) && ( <
                >
                <
                CustomInput formControlProps = {
                    {
                        className: 'input'
                    }
                }
                inputProps = {
                    {
                        type: 'password',
                        onChange: onOldPass,
                        value: oldPass,
                        autoComplete: 'current-password',
                        dir: 'ltr',
                    }
                }

                labelText = 'Current password' /
                >
                <
                div className = "sub-title"
                style = {
                    {
                        opacity: (oldPassSubtitle) ? "1" : "0"
                    }
                } >
                {
                    oldPassSubtitle
                } <
                /div> <
                />
            )
        } {
            (isBoth || isNew) && ( <
                >
                <
                CustomInput formControlProps = {
                    {
                        className: 'input'
                    }
                }
                inputProps = {
                    {
                        type: 'password',
                        onChange: onPass,
                        value: pass,
                        autoComplete: 'new-password',
                        dir: 'ltr',
                    }
                }
                labelText = 'Minimum 6 characters' /
                >
                <
                div className = "sub-title"
                style = {
                    {
                        opacity: (passSubtitle) ? "1" : "0"
                    }
                } >
                {
                    passSubtitle
                } <
                /div> <
                CustomInput formControlProps = {
                    {
                        className: 'input'
                    }
                }
                inputProps = {
                    {
                        type: 'password',
                        onChange: onRePass,
                        value: rePass,
                        autoComplete: 'new-password',
                        dir: 'ltr',
                    }
                }
                labelText = 'Minimum 6 characters' /
                >
                <
                div className = "sub-title"
                style = {
                    {
                        opacity: (rePassSubtitle) ? "1" : "0"
                    }
                } >
                {
                    rePassSubtitle
                } <
                /div> <
                />
            )
        } <
        div className = "forgot-pass"
        style = {
            {
                opacity: (showForgotPass) ? "1" : "0"
            }
        }

        >
        {
            (forgotPassStatus === statusCodes.pending) ? ( <
                CircularProgress / >
            ) : ( <
                span className = "send"
                onClick = {
                    onForgotPass
                } >
                Forgot Password ?
                <
                /span>
            )
        } <
        /div> <
        BottomFixedContainer breakpoints = {
            breakpoints
        } >
        <
        Button className = "button"
        containerProps = {
            {
                className: "button-container"
            }
        }
        type = 'submit'
        disabled = {
            validate(type, oldPass, pass, rePass)
        }
        waiting = {
            waiting
        }
        onClick = {
            submit
        }
        block round >
        Next <
        /Button>   <
        /BottomFixedContainer> <
        /div> <
        /div>
    );
}




const getTitle = type => {
    switch (type) {
        case 'new':
            {
                return 'Create your account password';
            }
        case 'existing':
            {
                return 'Welcome back, Enter your password to continue';
            }
        case 'both':
            {
                return 'New Password?';
            }
        default:
            {
                break;
            }

    }
}


const validate = (type, oldPass, pass, rePass) => {
    return (
        (
            (
                type === 'new' ||
                type === 'both'
            ) &&
            (
                pass !== rePass ||
                pass.length < 6
            )
        ) ||
        (
            (
                type === 'existing' ||
                type === 'both'
            ) &&
            (
                oldPass.length < 6
            )
        )
    );
}