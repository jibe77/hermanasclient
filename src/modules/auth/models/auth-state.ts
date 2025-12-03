/**
 * Auth state constants to replace deprecated AuthState from @aws-amplify/ui-components
 * Compatible with Amplify v6
 */
export enum AuthState {
    SignedIn = 'signedIn',
    SignedOut = 'signedOut',
    SigningIn = 'signingIn',
    SigningUp = 'signingUp',
    ForgotPassword = 'forgotPassword',
    ConfirmSignIn = 'confirmSignIn',
    ConfirmSignUp = 'confirmSignUp',
    VerifyingAttributes = 'verifyingAttributes',
}
