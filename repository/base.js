export async function getApi() {
    try {
        const response = await fetch('https://randomuser.me/api?results=10');
        return response.json();

    } catch (error) {
        // throw (error);

    }
}