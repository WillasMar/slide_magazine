//variáveis de apoio
var slideWidth; //armazena o tamanho dos slides
var slideArea; //armazena a area dos slides
var slideItem; //armazena os slides
var item = 0; //contagem dos slides
var posicao; //armazena qual slide está selecionado 
var acao = 1; //define se o slide volta ou avança no progresso

$(function(){
	slideWidth = document.getElementById('slide').offsetWidth;
	slideArea = document.getElementById('slideArea');
	slideItem = document.getElementsByClassName('slideItem');

	progresso(); //chama a função da barra de progresso

	//configura o tamanho dos slides e da area onde ficam
	$('.slideArea').css('width',slideWidth * slideItem.length);
	$('.slideItem').css('width',slideWidth);

	//adiciona função de click nos botões de passar o slide
	//aqui também é verificado se é para voltar ou avançar o slide
	$('.passar').bind('click', function(){
		if($(this).hasClass('anterior')){
			if(item > 0){
				item--;	
				$('.progressoInt').stop();
				$('.progressoInt').css('width','0px');
				passar(item);
			}			
		}else if($(this).hasClass('posterior')){
			if(item < slideItem.length - 1){
				item++;	
				$('.progressoInt').stop();
				$('.progressoInt').css('width','0px');
				passar(item);
			}			
		}		
	});

	//adiciona função de clique nas posições do slide
	//ao clicar o slide vai para a posição correspondente
	$('.posicaoItem').bind('click', function(){
		var classe = $(this).attr("class");
		var vet = classe.split("");
		var posItem = vet[13];
		item = posItem;
		$('.progressoInt').stop();
		$('.progressoInt').css('width','0px');
		passar(item);
	});

	//adiciona evento de passar o mouse no slide
	//ao passar o slide pausa, ao sair ele continua
	$('.slide').hover(function(){
		$('.progressoInt').stop();
	}, function(){
		progresso();
	});

	//função que enche a barra de progresso
	//ao finalizar chama a função de passar o slide
	function progresso(){
		$('.progressoInt').animate({
			'width':'598px'
		},{
			duration:10000,
			complete:function(){
				$(this).css('width','0px');
				
				//faz uma verificação devido as outras funções
				if(item == 0){
					acao = 1;
				}else if(item == slideItem.length - 1){
					acao = 0;
				}

				//continua com a verificação normal
				if(acao == 1){
					item++;
					if(item == slideItem.length - 1){acao = 0;}	
					passar(item);
				}else{
					item--;
					if(item == 0){acao = 1;}
					passar(item);
				}				
			}
		});
	}

	//função que faz o slide avançar
	function passar(pos){
		posicao = '.posicao .p' + pos;
		$('.posicao .posicaoItem').removeClass('selecionado');
		$(posicao).addClass('selecionado');
		$('.slideArea').css('margin-left', '-'+ (slideWidth * pos) +'px');

		setTimeout(progresso,2000);		
	}
});