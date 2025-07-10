import AuthContext from './AuthContext';

const AuthProvider = () => {
    const authInfo={
        name:"nazmul"
    }
    return <AuthContext value={authInfo}></AuthContext>
};

export default AuthProvider;