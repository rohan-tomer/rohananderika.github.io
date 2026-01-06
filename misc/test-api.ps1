# API Configuration
# DISABLED
$config = @{
    Uri = ""
    ApiKey = ""
}

# Request body
$body = @{
    apiKey = $config.ApiKey
    name = "Henry Fender"
    email = "hjfender@gmail.com"
} | ConvertTo-Json

# Headers
$headers = @{
    "Content-Type" = "application/json"
}

# Debug information
Write-Host "Request Details:"
Write-Host "URI: $($config.Uri)"
Write-Host "Headers:" 
$headers | Format-Table -AutoSize
Write-Host "Body:"
Write-Host $body

# Make the request
try {
    # Create request parameters
    $params = @{
        Uri = $config.Uri
        Method = 'Post'
        Headers = $headers
        Body = $body
        UseBasicParsing = $true
        Verbose = $true
    }

    Write-Host "Sending request with parameters:"
    $params | Format-Table -AutoSize

    $response = Invoke-WebRequest @params

    Write-Host "Raw Response:"
    Write-Host $response

    # Parse and display the response
    $responseContent = $response.Content | ConvertFrom-Json
    Write-Host "`nParsed Response:"
    Write-Host "Response Status: $($responseContent.statusCode)"
    Write-Host "Success: $($responseContent.success)"
    Write-Host "Data: $($responseContent.data | ConvertTo-Json)"
}
catch {
    Write-Host "Error occurred: $_"
    Write-Host "Response: $($_.Exception.Response)"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)"
    Write-Host "Status Description: $($_.Exception.Response.StatusDescription)"
}