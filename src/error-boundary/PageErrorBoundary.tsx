import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function PageErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        if (error.status == 400 ||
                error.status == 404 ||
                error.status == 401 ||
                error.status == 500) {

            return (<h1>{error.data}</h1>)
        }
        
    }

    return (<h1>Página não encontrada.</h1>);
}