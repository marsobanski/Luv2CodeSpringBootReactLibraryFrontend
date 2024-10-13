import {Redirect} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import {SpinnerLoading} from '../layouts/Utils/SpinnerLoading';
import {OktaSigninWidget} from './OktaSigninWidget';

export const LoginWidget =  ({ config }) =>  {
    //INFO Żeby to zrozumieć trzeba by poczytać dokumentację OKTA
    const { oktaAuth, authState } = useOktaAuth();
    const  onSuccess = (tokens) =>  {
        oktaAuth.handleLoginRedirect(tokens)
    };

    const onError = (error)=> {
        console.error('Error on sign in', error)
    }

    if (!authState) {
        return (<SpinnerLoading/>)
    }

    return authState.isAuthenticated ?
        <Redirect to={{ pathname: '/'}} />
        :
        <OktaSigninWidget config={config} onSuccess={onSuccess}/>
}