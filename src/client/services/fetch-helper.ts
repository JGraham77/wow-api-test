import Swal from "sweetalert2";

type VALID_METHODS = "GET" | "POST" | "PUT" | "DELETE";

export const GET = (url: string) => fetcher(url);
export const POST = (url: string, data: any) => fetcher(url, "POST", data);
export const PUT = (url: string, data: any) => fetcher(url, "PUT", data);
export const DELETE = (url: string) => fetcher(url, "DELETE");

interface WorkableRequestInit {
    method: string;
    headers: { [key: string]: any };
    body?: string;
}

export async function fetcher<T = any>(url: string, method: VALID_METHODS = "GET", data?: any) {
    return new Promise<T>(async (resolve, reject) => {
        const TOKEN = localStorage.getItem("token");

        const headers: { [key: string]: any } = {};
        const fetchOptions: WorkableRequestInit = {
            method,
            headers,
        };

        if (TOKEN) {
            fetchOptions["headers"]!["Authorization"] = `Bearer ${TOKEN}`;
        }

        if (method === "POST" || method === "PUT") {
            fetchOptions["headers"]!["Content-Type"] = "application/json";
            fetchOptions["body"] = JSON.stringify(data);
        }

        try {
            const res = await fetch(url, fetchOptions);
            const data = await res.json();

            if (res.ok) {
                resolve(data);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            const err = error as Error;
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Uh oh!",
                text: err.message,
            });
        }
    });
}
