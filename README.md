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

  
  
  
  
  
  


