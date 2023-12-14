import { GoogleLogin } from 'react-google-login';

const clientId = '107286850999-b807i22qqt7abdvq69lb6a0qsqmd67e1.apps.googleusercontent.com';
const GoogleLoginButton = () => {
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
    };
    
    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    };
    
    return (
        <div>
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
        />
        </div>
    );
}

export default GoogleLoginButton;