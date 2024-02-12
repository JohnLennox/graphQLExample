const queryBooks = async () => {
    let data = [];
    var query =
        `query GetBooks  {
            books {
                bookId
                name
            }
        }`;

    try {
        let response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query })
        });
        data = await response.json(); // Wait for the JSON result
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
    return data;
}

const queryBooksById = async () => {
    let data = [];
    var query =
        `query GetBooksById ($id: Int) {
            books (idEquals: $id){
                bookId
                name
                pages
                author {
                    name
                }
            }
        }`;

    try {
        let response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query })
        });
        data = await response.json(); // Wait for the JSON result
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
    return data;
}


function apiHandler() {
    return { queryBooks, queryBooksById }
}

export default apiHandler;