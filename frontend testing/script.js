const form = document.getElementById('content-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    resultDiv.innerText = 'Sending request...';

    const productType = document.getElementById('product_type').value;
    const keywords = document.getElementById('keywords').value;

    try {
        const response = await fetch('http://127.0.0.1:5000/api/generate_content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_type: productType,
                keywords: keywords
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        resultDiv.innerText = JSON.stringify(data, null, 2); // Display the full JSON response
    } catch (error) {
        resultDiv.innerText = 'Error: ' + error.message;
    }
});