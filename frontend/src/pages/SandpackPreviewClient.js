import {
    SandpackPreview,
    useSandpack
} from "@codesandbox/sandpack-react";

import React, { useContext, useEffect, useRef } from "react";
import { ActionContext } from './ActionContext'; // Updated import path

function SandpackPreviewClient() {

    const previewRef = useRef();
    const { sandpack } = useSandpack();
    const { action, setAction } = useContext(ActionContext);

    useEffect(() => {
        GetSandpackClient();
    }, [sandpack && action]);

    const GetSandpackClient = async () => {
        const client = previewRef?.current?.getClient();
        if (client) {
            console.log(client);
            const result = await client.getCodeSandboxURL();
            // console.log(result);
            if (action?.actionType == "deploy") {
                const link = 'https://' + result?.sandboxId + '.csb.app';
                setTimeout(() => {
                    window.location.assign(link);
                }, 1000); // Add a delay of 1 second
                console.log(result?.sandboxId);
                console.log(link);
            } else if (action?.actionType == "export") {
                window.location.assign(result?.editorUrl);
            }
        }
    }
    return (

        <SandpackPreview ref={previewRef} style={{ height: '600px' }} showNavigator={true} />

    )
}

export default SandpackPreviewClient;