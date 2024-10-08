class LangflowClient {
    constructor(baseURL, applicationToken) {
        this.baseURL = baseURL;
        this.applicationToken = applicationToken;
    }
    async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
        headers["Authorization"] = `Bearer ${this.applicationToken}`;
        headers["Content-Type"] = "application/json";
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const responseMessage = await response.json();
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
            }
            return responseMessage;
        } catch (error) {
            console.error('Request Error:', error.message);
            throw error;
        }
    }

    async initiateSession(flowId, langflowId, inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
        const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
    }

    handleStream(streamUrl, onUpdate, onClose, onError) {
        const eventSource = new EventSource(streamUrl);

        eventSource.onmessage = event => {
            const data = JSON.parse(event.data);
            onUpdate(data);
        };

        eventSource.onerror = event => {
            console.error('Stream Error:', event);
            onError(event);
            eventSource.close();
        };

        eventSource.addEventListener("close", () => {
            onClose('Stream closed');
            eventSource.close();
        });

        return eventSource;
    }

    async runFlow(flowIdOrName, langflowId, inputValue, inputType = 'chat', outputType = 'chat', tweaks = {}, stream = false, onUpdate, onClose, onError) {
        try {
            const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
            //console.log('Init Response:', initResponse);
            if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
                const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
                console.log(`Streaming from: ${streamUrl}`);
                this.handleStream(streamUrl, onUpdate, onClose, onError);
            }
            return initResponse;
        } catch (error) {
            console.error('Error running flow:', error);
            onError('Error initiating session');
        }
    }
}

async function getBotResponse(userMessage) {
    const flowIdOrName = '68344e2d-b57a-4992-b172-214aca3fcaa1';
    const langflowId = 'efde00ae-4d32-4471-8e8d-26482560f5a9';
    const inputValue = userMessage;
    const inputType = 'chat';
    const outputType = 'chat';
    const stream = false;
    const applicationToken = 'AstraCS:gPMthwSCPXlJgTescaMBPySM:1ec7f2f52fe7b9c35b3f8495a2a29d84604f96373138fd76f09a175222b99cd7';
    const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com',
        applicationToken);
    try{
        const tweaks = {
            "ChatInput-17Y07": {},
            "AstraVectorStoreComponent-Zo8EJ": {},
            "ParseData-i5f3r": {},
            "Prompt-HvopQ": {},
            "ChatOutput-mXK87": {},
            "SplitText-Sy3qT": {},
            "File-uyRG3": {},
            "AstraVectorStoreComponent-WZDCY": {},
            "File-mw66q": {},
            "File-AkkQC": {},
            "File-He07V": {},
            "AstraVectorize-h9QGT": {},
            "AstraVectorize-vpUfx": {},
            "Maritalk-k38zD": {}
        };

        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputValue,
            inputType,
            outputType,
            tweaks,
            stream,
            (data) => console.log("Received:", data.chunk), // onUpdate
            (message) => console.log("Stream Closed:", message), // onClose
            (error) => console.log("Stream Error:", error) // onError
        );
        if (!stream && response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const output = firstComponentOutputs.outputs.message;
            //console.log("Final Output:", output.message.text);
            return output.message.text;
        }
    }
    catch (error) {
        //console.error('Main Error', error.message);
        return error.message;
    }
}

async function main(){
    const entrada = "Ola";
    //const saida = await getBotResponse("liste para mim os processos do PODER  JUDICIÁRIO TRIBUNAL  DE JUSTIÇA  DO ESTADO  DE SÃO  PAULO");
    const saida = await getBotResponse(entrada);
    console.log(saida);
}

main();