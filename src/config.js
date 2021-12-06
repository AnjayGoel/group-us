let api_url = null
if (process.env.NODE_ENV === 'development') {
    api_url = "http://127.0.0.1:5000"
} else {
    api_url = "https://silverbugci.centralindia.cloudapp.azure.com"
}
export {api_url}