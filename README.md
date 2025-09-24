# NextMailer

Um disparador de e-mail automático criado em **Next.js** + **Nodemailer** para facilitar o envio mensal de e-mails padronizados à imobiliária, solicitando a rescisão do fundo de reserva, apenas inserindo os comprovantes.

---

## ⚙️ Pré-requisitos

- Node.js (versão compatível com Next.js que você está usando, ex: 16.x ou 18.x)
- Yarn ou npm
- Acesso a um servidor de SMTP ou serviço de e-mail compatível (Gmail, Outlook, SMTP próprio, etc.)
- Credenciais de e-mail válidas (usuario, senha ou token de aplicação)

---

## 🔧 Variáveis de ambiente

Crie um arquivo `.env.local` e defina essas variáveis:

```env
EMAIL_USER=seu-email
EMAIL_PASS=sua-senha (alguns serviços requerem uma senha de apps)
EMAIL_TO=recipiente-do-email
````

---

## 🏃 Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/GabrielNM12/NextMailer.git
   cd NextMailer
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure as variáveis de ambiente (`.env.local`).

4. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Abra em: [http://localhost:3000](http://localhost:3000)

---

## ✅ Como usar

1. Acesse a interface do app.
2. Carregue os comprovantes.
3. Clique em enviar.
4. O backend monta o e-mail com template + anexos e dispara via Nodemailer.

---

## 🔒 Segurança

* Nunca exponha credenciais no repositório.
* Use sempre variáveis de ambiente.

---
