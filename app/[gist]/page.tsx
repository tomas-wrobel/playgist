import {cookies} from "next/headers";
import GistIDE from "../components/gist-ide";
import GistProps from "./props";

export default async function GistPage(props: GistProps) {
    const token = cookies().get("token")?.value;
    const headers = new Headers();

    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    let access = false;

    const response = await fetch(`https://api.github.com/gists/${props.params.gist}`, {
        method: "GET",
        headers
    });

    if (!response.ok) {
        return <div className="text-center">Gist not found</div>;
    }

    const {files, owner} = await response.json();

    if (token) {
        const {login} = await fetch("https://api.github.com/user", {
            method: "GET",
            headers,
        }).then((response) => response.json());
        access = login === owner.login;
    } 
    
    const content: Record<string, string> = {};

    for (const file in files) {
        content[file] = files[file].content;
    }

    return <GistIDE gist={props.params.gist} files={content} readOnly={!access} />;
}