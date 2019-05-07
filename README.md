# ebay-email-alert
Aplicação gera alertas sobre preço de produtos de acordo com um alerta criado. O usuário informa uma frase de busca, um email e seleciona um intervalo e a aplicação o informa por email periodicamente sobre o preço de um produto desejado.


# Inicializando projeto

Comandos nescessários inicialização do projeto:
  
  > docker-compose up --build -d db
	
  > docker-compose up --build
  
  > URL: http://localhost:3001/



# Arquitetura do projeto:

Backend (WebApi):
	
	> Repository: fazem as funções CRUD no banco.
	
	> Service: executam as regras de negocio e fazem a comunicação com o frontend, por JSON.
	
	> Config: contem o arquivo com as configuração necessário para o banco de dados (mongodb).

Frontend (Front):
	
	> Components: contem os components html com suas respectivas funções para se comunicarem com a API.
	
	> Config: contem o arquivo com as configurações necessárias para fazer a comunicação com a API.
	
	
# Ferramentas adicionais usadas

eslint:

	> pacote do npm, utilizado para formatar o codigo no padrão 'AiBNB styleguide'
	> documentação: https://www.npmjs.com/package/eslint
	
nodemailer:

	> pacote do npm, utilizado para facilitar o envio de email
	> documentação: https://www.npmjs.com/package/nodemailer
	
Servidor SMTP Gmail:

	> servidor de envio de emails disponibilizado pelo Google.  
	> link de configuração: https://www.hostinger.com.br/tutoriais/aprenda-a-utilizar-o-smtp-google/
	
request-promise:

	> pacote do npm, utilizado para fazer a requisições na API do eBay (Finding API).
	> documentação: https://www.npmjs.com/package/request-promise

react-router-dom:

	> pacote do npm, utilizado para realizar a navegação entre as paginas
	> documentação: https://www.npmjs.com/package/react-router-dom
	
reactstrap:

	> pacote do npm, disponibiliza components css para facilitar a criação do layout do site.
	> documentação: https://reactstrap.github.io/
	
axios:

	> pacote do np, utilizado para realizar as requisições em promise para o backend
	> documentação: https://www.npmjs.com/package/axios  
	
Katalon Recorder:

	> ferramenta para gravação e execução de testes de insterface automatizados de forma extremamente facilitada.
	> documentação: https://www.katalon.com/resources-center/blog/katalon-automation-recorder/
  
  

# Testes automatizados

Foi utilizado a ferramenta Katalon recorder para gerar testes de interface.

Como utilizalo no Google Chrome: 

	> Acesse o link:  https://chrome.google.com/webstore/detail/katalon-recorder/ljdobmomdgdljniojadhoplhkpialdid
	
	> Clique em "Usar no Chrome"
	
	> Clique em "Adicionar extensão"
	
	> Após alguns segundos irá aparecer no canto superior direito do navegador o icone do Katalon, clique nele.
	
	> Aberto a extenção do Katalon, clique no icone de pasta que está ao lado direito do texto "Test Suites".
	
	> Após abir selecione o arquivo html com o nome "Testes funcionais - eBay-email-alert", que se encontra dentro da pasta "Test 		Katalon" que está rais do repositório. 
	
	> Para iniciar a execução dos testes basta clicar em "Play All"
	
OBS.: Observei durante os testes que os comandos relacionados a validação de alertas (AssestAlertPresent, e VerifyAlertPresent) são intermitentes, por isso em alguma exeução um teste pode falhar por essa inconsistencia.


