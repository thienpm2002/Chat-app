import { useRouteError,isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
    const err = useRouteError();
    if(isRouteErrorResponse(err)) return <h1>{err.status} {err.statusText}</h1>
    return <h1>{err.message}</h1>
}

export default ErrorPage