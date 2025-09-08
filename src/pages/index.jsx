import { useState, useEffect } from "react";
import "@material/web/textfield/filled-text-field.js";
import "@material/web/button/filled-button.js";
import "@material/web/progress/circular-progress.js";

export default function Home() {

    const [file, setFile] = useState(null);
    const [body, setBody] = useState("");
    const [subject, setSubject] = useState("");
    const [loading, setLoading] = useState(false);

     useEffect(() => {
        const fetchTemplate = async () => {
            const res = await fetch("/template.json");
            const data = await res.json();
            setBody(data.body);
            setSubject(data.subject);
        };
        fetchTemplate();
    }, []);

    const handleChangeFile = (e) => {
        setFile(e.target.files);
    }

    const handleSendEmail = async () => {
        if (!file || loading) return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("subject", subject);
            formData.append("body", body);
            
            if (file) {
                for (const fileElm of file) {
                    formData.append("file", fileElm);
                }
            }

            const res = await fetch("/api/sendMail", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("Email sent:", data);
            if (data.success) {
                alert("Email enviado com sucesso!");
            } else {
                alert("Erro ao enviar email");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Falha ao enviar email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <md-filled-text-field
                label="Assunto"
                value={subject}
                readonly
                style={{ width: "100%" }}
            ></md-filled-text-field>
            <md-filled-text-field
                label="Corpo do Email"
                value={body}
                onInput={(e) => setBody(e.target.value)}
                style={{ width: "100%" }}
                textarea
                rows="6"
            ></md-filled-text-field>
            <input
                type="file"
                onChange={handleChangeFile}
                multiple={true}
                style={{ border: "none", outline: "none", width: "100%" }}
            />
            <md-filled-button
                onClick={handleSendEmail}
                disabled={loading}
                style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                }}
            >
                {loading ? (
                    <md-circular-progress indeterminate></md-circular-progress>
                ) : (
                    "Enviar Email"
                )}
            </md-filled-button>
        </div>
    )
}