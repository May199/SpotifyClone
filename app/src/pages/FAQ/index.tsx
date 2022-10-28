import menuAnimation from '../../utils/menuAnimation';
import './index.css';

function FAQ(){

    return(
        <div>
            <div className="accordion">
                <h1>Perguntas Frequentes</h1>
                <div className="accordion-item">
                <div className="accordion-item-header" onClick={menuAnimation}>
                    Qual conexão eu preciso para usar o Spotify?
                </div>
                <div className="accordion-item-body">
                    <div className="accordion-item-body-content">
                        O Spotify pode usar qualquer conexão! Banda larga móvel, ADSL, modem a cabo ... Eu recomendo conexão
                        de 1M ou mais rápida, porém você pode usar o Spotify também na velocidade de 384 kbps ou até
                        inferior (quando em redes móveis lentas, habilite apenas qualidade de stream inferior).
                    </div>
                </div>
                </div>
                
                <div className="accordion-item">
                    <div className="accordion-item-header" onClick={menuAnimation}>
                        O Spotify transmite em EDGE (2G, rede móvel)?
                    </div>
                    <div className="accordion-item-body">
                        <div className="accordion-item-body-content">
                            Se você usar 160 kbps ou configuração inferior, sim. Mas lembre-se de que a rede deve estar perto de
                            200 kbps o tempo todo antes que seja possível sem buffer. 3G recomendado e velocidade móvel de pelo
                            menos 384 kbps para 320 kbps.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <div className="accordion-item-header" onClick={menuAnimation}>
                        Quanto espaço eu preciso para Micro-SD para minha lista offline?
                    </div>
                <div className="accordion-item-body">
                    <div className="accordion-item-body-content">
                        Se você preferir edições de rádio, são quase 8,5 GB para 1.000 músicas. Basicamente, 32 GB são
                        necessários se você acredita que um dia estará perto do limite de 3.333 trilhas do modo /
                        dispositivo off-line. O cartão grande também é mais barato do que pequeno se você olhar o valor do
                        preço / tamanho. Verifique as especificações do seu telefone, qual é o tamanho máximo do cartão
                        suportado pelo seu telefone. Na maioria dos telefones, é de 32 GB.
                    </div>
                </div>
                </div>

                <div className="accordion-item">
                <div className="accordion-item-header" onClick={menuAnimation}>
                    Como posso usar o Spotify fora do meu país?
                </div>
                <div className="accordion-item-body">
                    <div className="accordion-item-body-content">
                        Você precisa de uma assinatura paga para fazer isso, então você pode usar o Spotify sem problemas,
                        contanto que você pague por ele. No entanto, lembre-se de que talvez você não consiga renovar a
                        assinatura em um novo país, portanto, certifique-se de ter meses suficientes. No tempo de viagem
                        grátis é limitado a 2 semanas.
                    </div>
                </div>
                </div>

            </div>
        </div>
    );
}

export default FAQ;