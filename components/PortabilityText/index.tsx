import { StrapiFile } from "@/interfaces/StrapiFile";
import { TableMobile } from "./tableMobile";
import { createStrapiImageUrl } from "@/utils/createStrapiImageUrl";
import styles from "./styles.module.scss";

interface Props {
  ota: StrapiFile;
  procuracao: StrapiFile;
  solicitacaoTransferencia: StrapiFile;
  solicitaoTransferenciaValoresMobiliarios: StrapiFile;
}

export const renderTexts = ({
  ota,
  procuracao,
  solicitacaoTransferencia,
  solicitaoTransferenciaValoresMobiliarios,
}: Props) => {
  const otaUrl = createStrapiImageUrl(ota?.data?.attributes?.url);
  const procuracaoUrl = createStrapiImageUrl(procuracao?.data?.attributes?.url);
  const solicitacaoTransferenciaUrl = createStrapiImageUrl(
    solicitacaoTransferencia?.data?.attributes?.url
  );
  const solicitaoTransferenciaValoresMobiliariosUrl = createStrapiImageUrl(
    solicitaoTransferenciaValoresMobiliarios?.data?.attributes?.url
  );

  return [
    {
      id: 1,
      title: "Entrada",
      contents: [
        {
          title: "Renda Fixa",
          description: (
            <ul className={styles["accordion__content"]}>
              <li>
                1. O processo de transferência de custódia pode ser iniciado
                logo após a abertura de conta na Plataforma da Mirae Asset;
              </li>
              <br />

              <li>
                2. É recomendado que o processo seja iniciado na Mirae Asset e,
                posteriormente, seja feito o pedido na instituição cedente.
                Envie ao seu assessor a nota de negociação/compra dos ativos que
                você deseja transferir para Mirae Asset. No documento, deve
                conter:
                <br />
                <br />
                <div>
                  <div className={styles["accordion__content__sub-title"]}>
                    <span>
                      <li>a. Identificação do ativo (Código CETIP)</li>
                      <li>b. Quantidade do ativo</li>
                      <li>c. PU de aplicação</li>
                      <li>
                        d. Data de aquisição/data de compra e data de
                        vencimento.
                      </li>
                    </span>
                  </div>
                  <br />
                  <br />
                  Pedidos de reserva e extratos não são aceitos;
                  <br />
                  <br />
                  <span>
                    É possível também fazer o processo diretamente pelo Portal
                    de cliente da Mirae Asset.
                    <br />
                    Para isso, acesse:
                    <strong>
                      {" "}
                      Produtos {">"}
                      Portabilidade de investimentos {">"} Solicitação de
                      entrada {">"} Renda fixa.
                    </strong>
                  </span>
                </div>
              </li>
              <br />
              <li>
                3. Com o pedido feito na Mirae Asset, verifique o procedimento
                exigido pela instituição cedente para realizar a portabilidade
                de saída dos seus ativos. A depender da instituição, alguns
                documentos adicionais ou procedimentos específicos podem ser
                solicitados pela instituição cedente;
              </li>
              <br />
              <li>
                4. Caso o preenchimento da STVM seja necessário, em
                “Identificação de Cessionário”, preencha o campo “Código do
                Investidor” com o número da sua conta Mirae Asset com o dígito
                verificador. Lembre-se que o código Mirae Asset com o dígito
                verificador é diferente do número utilizado durante o processo
                de envio de TED. Caso não tenha essa informação, solicite ao seu
                assessor.
              </li>
              <br />
              <li>
                5. Em caso de dúvidas, entre em contato com as equipes de
                atendimento da Mirae Asset ou com o seu assessor de
                investimentos.
              </li>
              <br />
              <br />
              <strong> Importante </strong>
              <br />
              <ul className={styles["accordion__content__list"]}>
                <br />

                <li>
                  A Mirae Asset não portabiliza COE de outras instituições,
                  somente COEs emitidos pela Mirae Asset.
                </li>
                <li>
                  Atualmente, a Mirae Asset não portabiliza NTN-B 760197 e
                  760198, somente NTN-B 760199.
                </li>
                <li>
                  A saída dos ativos deve ser acompanhada e cobrada junto à
                  instituição cedente. A Mirae Asset depende do lançamento dos
                  ativos para acatá-los. Após aceitarmos o lançamento, os ativos
                  deverão aparecer na sua conta Mirae Asset em até um dia útil.
                </li>
                <li>
                  Caso deseje cancelar a operação, solicite o cancelamento na
                  instituição cedente;
                </li>
                <li>
                  Caso não tenha as notas de negociação, solicite diretamente na
                  instituição que os ativos foram adquiridos.
                </li>
                <li>
                  Este é o processo de entrada de Renda Fixa adotado quando os
                  ativos vêm de fora do Grupo Mirae Asset. Caso seu ativo esteja
                  em outra instituição pertencente ao Grupo Mirae Asset basta
                  enviar a STVM de saída, conforme também descrito na aba
                  “Saída” deste FAQ;
                </li>
                <li>
                  De acordo com o prazo regulatório, a instituição cedente tem
                  dois dias úteis para fazer o lançamento dos ativos. Caso a
                  solicitação seja feita corretamente, o processo na Mirae Asset
                  também leva dois dias úteis;
                </li>
                <li>
                  Solicite os mesmos ativos e quantidades na instituição cedente
                  e na cessionária (Mirae Asset). Certifique-se de que todos os
                  ativos presentes na STVM de saída também estão registrados com
                  as devidas notas de negociação no Hub/Rede pelo seu assessor
                  ou pelo Portal de cliente da Mirae Asset, se você fez o
                  processo sozinho. Caso não tenhamos a solicitação e nota de
                  negociação de um desses ativos, todos os ativos lançados
                  deverão ser recusados.
                </li>
              </ul>
            </ul>
          ),
        },
        {
          title: "Renda variável",
          description: (
            <ul className={styles["accordion__content__list2"]}>
              <h3>Originários de corretoras:</h3>

              <li>
                1. O processo de transferência de custódia pode ser iniciado
                logo após a conclusão da abertura de conta na Plataforma da
                Mirae Asset;
              </li>
              <br />
              <li>
                2.{" "}
                <a
                  href={solicitacaoTransferenciaUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Faça o download
                </a>{" "}
                da Solicitação de Transferência de Valores Mobiliários, que deve
                ser enviada à instituição cedente. Não é preciso enviar nenhuma
                documentação à Mirae Asset;
              </li>
              <br />
              <li>
                <li>3. Preencha todos os campos da solicitação:</li>
                <br />
                <div className={styles["accordion__content__list2__sub-title"]}>
                  <span
                    className={
                      styles["accordion__content__list2__sub-title__content"]
                    }
                  >
                    <li>
                      Em Identificação de Cedente, preencha com os dados do
                      cliente e indique qual é a instituição cedente, isto é,
                      onde os ativos estão atualmente no campo “instituição”;
                    </li>
                    <li>
                      Em Identificação do Cessionário, preencha também com os
                      dados do cliente. A instituição cessionária já está
                      preenchida como Mirae Asset. No campo “Código do
                      Investido”, insira o número da sua conta Mirae Asset com o
                      dígito verificador.
                    </li>
                  </span>
                </div>
              </li>
              <br />
              <li>
                Lembre-se que o código Mirae Asset com o dígito verificador é
                diferente do número utilizado durante o processo de envio de
                TED. Caso não tenha essa informação, solicite ao seu assessor.
              </li>
              <br />
              <li>
                4. Envie a documentação para a instituição cedente. Documentos
                adicionais ou procedimentos específicos poderão ser solicitados
                pela instituição cedente;
              </li>
              <br />
              <li>
                5. Em caso de dúvidas, entre em contato com as equipes de
                atendimento da Mirae Asset ou com o seu assessor de
                investimentos.
              </li>
              <br />
              <br />
              <strong> Importante </strong>
              <br />
              <ul
                className={
                  styles["accordion__content__list2__sub-title__important"]
                }
              >
                <li>
                  A saída dos ativos deve ser acompanhada e cobrada junto à
                  instituição cedente. A Mirae Asset depende do lançamento dos
                  ativos para acatá-los. Após aceitarmos o lançamento, os ativos
                  deverão aparecer na sua conta Mirae Asset em até um dia útil.
                </li>
                <li>
                  Caso possua direitos e proventos, lembre-se de detalhá-los de
                  forma separada na STVM por meio da coluna “tipo”.
                </li>
                <li>
                  O prazo para a instituição cedente fazer o lançamento dos
                  ativos é de 2 dias úteis. Do contrário, o cliente deve
                  verificar se há alguma pendência na solicitação nesta
                  instituição;
                </li>
              </ul>
              <br />
              <h3>Originários de Bancos ou empresa escrituradora (OTA):</h3>
              <br />
              <li>
                1. O processo de transferência de custódia pode ser iniciado
                logo após a conclusão da abertura de conta na Plataforma da
                Mirae Asset;
              </li>
              <br />
              <li>
                2. Faça o download e preencha o(s) documento(s):
                <div
                  className={styles["accordion__content__list2__sub-title2"]}
                >
                  <span
                    className={
                      styles["accordion__content__list2__sub-title2__content2"]
                    }
                  >
                    <li>
                      <a href={otaUrl} target="_blank" rel="noreferrer">
                        🡻 Ordem de Transferência de Ações (OTA)
                      </a>
                    </li>
                    <li>
                      <a href={procuracaoUrl} target="_blank" rel="noreferrer">
                        🡻 Procuração
                      </a>
                      (Somente se a empresa escriture seus próprios ativos)
                    </li>
                  </span>
                </div>
              </li>
              <br />
              <li>
                3. Preencha a OTA em duas vias e reconheça firma por
                autenticidade* para cada ativo a ser transferido.
              </li>
              <br />
              <span style={{ fontSize: "0.8rem" }}>
                *Exigência do escriturador
              </span>
              <br />
              <br />
              <li>
                4. No caso de OTA + Procuração, preencha a procuração em duas
                vias para cada ativo a ser transferido e reconheça firma por
                autenticidade;
              </li>
              <br />
              <li>
                5. Obtenha os seguintes documentos:
                <div
                  className={styles["accordion__content__list2__sub-title3"]}
                >
                  <span
                    className={
                      styles["accordion__content__list2__sub-title3__content3"]
                    }
                  >
                    <li>
                      Duas vias da OTA para cada ativo com firma reconhecida por
                      autenticidade;
                    </li>
                    <li>
                      Duas cópias autenticadas* do documento de identidade. Use
                      o mesmo documento cujo tipo e número foram preenchidos na
                      OTA;
                    </li>
                    <li>
                      Duas cópias autenticadas* do CPF (caso não conste no
                      documento de identidade);
                    </li>
                    <li>
                      Duas cópias autenticadas* de um comprovante residencial de
                      consumo mensal emitido há menos de dois meses;
                    </li>
                    <br />
                    <span>*Exigência do escriturador</span>
                  </span>
                </div>
              </li>
              <br />
              <li>
                6. Caso o cliente seja uma Pessoa Jurídica, são necessárias duas
                cópias autenticadas* dos seguintes documentos:
                <div
                  className={styles["accordion__content__list2__sub-title4"]}
                >
                  <span
                    className={
                      styles["accordion__content__list2__sub-title4__content4"]
                    }
                  >
                    <strong>
                      <li>PJ S.A.:</li>
                    </strong>
                    <li>
                      Duas vias da OTA para cada ativo com firma reconhecida por
                      autenticidade;
                    </li>
                    <li>
                      Extrato de Consulta ao CNPJ gerado por meio do site da
                      Receita Federal;
                    </li>
                    <li>
                      Estatuto social atualizado com selo da Junta Comercial;
                    </li>
                    <li>
                      ATA de eleição de diretoria vigente com selo da Junta
                      Comercial;
                    </li>
                    <li>
                      Certidão simplificada emitida pela Junta Comercial
                      expedida em até 30 dias (Ficha Cadastral Simplificada);
                    </li>
                    <li>
                      Procuração por instrumento público ou Certidão da
                      Procuração datada há no máximo 24 meses, se aplicável;
                    </li>
                    <li>
                      Documento de identidade válido e comprovante residencial
                      de consumo mensal emitido há menos de dois meses de cada
                      signatário.
                    </li>
                    <strong>
                      <li>PJ LTDA:</li>
                    </strong>
                    <li>
                      Duas vias da OTA para cada ativo com firma reconhecida por
                      autenticidade;
                    </li>
                    <li>
                      Extrato de Consulta ao CNPJ gerado por meio do site da
                      Receita Federal;
                    </li>
                    <li>Contrato social com selo da Junta Comercial;</li>
                    <li>
                      Todas as ATAs e alterações contratuais com selos da Junta
                      Comercial que constam mudança de endereço, mudança da
                      razão social, entrada e/ou saída de sócios;
                    </li>
                    <li>
                      Procuração por instrumento público ou Certidão da
                      Procuração emitida há no máximo 24 meses, se aplicável;
                    </li>
                    <li>
                      Certidão específica emitida pela Junta Comercial expedida
                      em até 30 dias relacionando todos os atos arquivados desde
                      à constituição;
                    </li>
                    <li>
                      Documento de identidade válido e comprovante residencial
                      de consumo mensal emitido há menos de dois meses de cada
                      signatário.
                    </li>
                  </span>
                  <br />
                  <span className={styles["accordion__content__baseboard"]}>
                    * Exigência do escriturador
                  </span>
                </div>
              </li>
              <br />
              <li>
                7. Envie os documentos por carta registrada ou Sedex* para:
              </li>
              <br />
              <li>
                Avenida Faria Lima, 3900 - 4º andar - Itaim Bibi - São Paulo /
                SP - CEP 04538-132
              </li>
              <br />
              <li className={styles["accordion__content__baseboard2"]}>
                *A Mirae Asset não se responsabiliza pelo extravio da
                correspondência caso a documentação não seja direcionada aos
                cuidados do Departamento de Portabilidade de Investimentos, via
                carta registrada ou Sedex;
              </li>
              <br />
              <strong> Importante </strong>
              <br />
              <ul
                className={
                  styles["accordion__content__list2__sub-title__important"]
                }
              >
                <li>
                  A documentação de OTA tem validade de 2 meses estipulada pelos
                  escrituradores;
                </li>
                <li>
                  Após o recebimento da documentação física, a Mirae Asset tem o
                  prazo médio de 3 dias úteis para analisar e enviar a
                  documentação para os escrituradores;
                </li>
                <li>
                  O prazo para a instituição cedente fazer o lançamento dos
                  ativos é de 2 dias úteis. Do contrário, o cliente deve
                  verificar se há alguma pendência na solicitação nesta
                  instituição;
                </li>
                <li>
                  Os escrituradores têm prazo regulamentar de sete dias úteis
                  para finalizar ou apontar alguma pendência no processo. Caso o
                  prazo não seja atendido, o cliente deve cobrar o escriturador;
                </li>
                <li>
                  OTA é o documento necessário para FII’s e Ações escrituradas;
                </li>
                <li>
                  Para saber se seu ativo está escriturado, solicite ao banco ou
                  empresa escrituradora um extrato de posição atualizada.
                </li>
                <li>
                  Os escrituradores exigem que os dados preenchidos na OTA sejam
                  idênticos aos cadastrados em seus sistemas;
                </li>
                <li>
                  Após a finalização do processo, a posição será refletida em
                  sua conta na Mirae Asset em três dias úteis;
                </li>
                <li>
                  Qualquer pessoa física terceira que tenha assinado a OTA deve
                  estar cadastrada no escriturador e no sistema da Mirae Asset
                  como o procurador do cliente;
                </li>
                <li>
                  Se o cliente estiver no exterior, o reconhecimento de firma
                  deve ser feito no consulado brasileiro;
                </li>
                <li>
                  Caso o escriturador aponte alguma pendência de documentação,
                  será necessário o envio da documentação complementar.
                </li>
              </ul>
            </ul>
          ),
        },
        {
          title: "Fundos de investimento",
          description: (
            <ul className={styles["accordion__content__list3"]}>
              <li>
                1. Após abrir a conta na Plataforma da Mirae Asset, faça o
                download do{" "}
                <a
                  href={solicitaoTransferenciaValoresMobiliariosUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  documento de solicitação de transferência;
                </a>
              </li>
              <br />
              <li>
                2. Preencha o documento com os dados da instituição de origem
                (cedente) e os dados da instituição de destino (cessionário -
                Mirae Asset); Em seguida, informe os dados das instituições de
                origem e destino conforme solicitado no texto de solicitação.
                Lembre-se: documentos adicionais ou procedimentos específicos
                podem ser solicitados pela instituição cedente;
              </li>
              <br />
              <li>
                3. Preencha o número de sua conta de cliente na cedente
                (instituição de origem) e cessionário (instituição de destino –
                Mirae Asset).
              </li>
              <br />
              <li>
                4. Preencha o quadro de descrição da operação com o nome e CNPJ
                do fundo. Para transferir todas as cotas, preencha a quantidade
                como “TOTALIDADE”. Não é possível realizar transferência
                parcial.
              </li>
              <br />
              <li>
                5. Caso necessário, envie a carta assinada com seu documento
                válido para a instituição cedente. São aceitos como documentos
                de identificação válidos:
                <div className={styles["accordion__content__list3__sub-title"]}>
                  <span
                    className={
                      styles["accordion__content__list3__sub-title__content"]
                    }
                  >
                    <li>RG expedido há menos de 10 anos;</li>
                    <li>CNH dentro da validade</li>
                    <li>
                      Documentos de classe válidos expedido há menos de 10 anos;
                    </li>
                    <li>
                      RNE para estrangeiros dentro da validade, se aplicável;
                    </li>
                  </span>
                </div>
              </li>
              <br />
              <li>
                Devido ao fato de transferência de fundos não está contida na
                ICVM 542, atente-se:
                <div
                  className={styles["accordion__content__list3__sub-title2"]}
                >
                  <span
                    className={
                      styles["accordion__content__list3__sub-title2__content"]
                    }
                  >
                    <li>
                      Você, como cliente, deve solicitar a cedente da
                      portabilidade seguinte seus fluxos de saída.
                    </li>
                    <li>
                      Pode ser que a cedente não aceite os padrões descritos
                      acima. Neste caso, avisaremos o cliente/assessor.
                    </li>
                  </span>
                </div>
              </li>
              <br />
              <strong>Importante</strong>
              <ul className={styles["accordion__content__list3__important"]}>
                <li>
                  A transferência de fundos depende diretamente do gestor e do
                  administrador do fundo;
                </li>
                <li>
                  A solicitação de transferência pode ser recusada pelo
                  Distribuidor cedente pelas seguintes razões:
                </li>
                <span>
                  <li>
                    a. Bloqueio judicial e de garantias que possam impedir a
                    transferência;
                  </li>
                  <li>b. Desistência do investidor;</li>
                  <li>c. Inconsistência nas informações cadastradas;</li>
                  <li>d. Posição não reconhecida;</li>
                  <li>
                    e. Movimentações de resgates ainda não convertidas e
                    liquidadas;
                  </li>
                  <li>
                    f. Distribuidor cessionário sem contrato com o administrador
                    do fundo.
                  </li>
                </span>
                <br />
                <li>
                  Caso você invista diretamente no administrador do fundo, a
                  cedente será o próprio administrador;
                </li>
                <li>
                  No momento, o fluxo de transferência para fundos de
                  investimentos não tem um prazo regulatório. No entanto, a
                  ANBIMA disponibilizou um manual de boas práticas que indica
                  que os seguintes prazos devem ser observados para a
                  transferência de cotas de Fundos de Investimento. Tais prazos
                  devem ser cobrados nas instituições referidas:
                </li>
                <span>
                  <li>
                    a. Cedente: ao receber o pedido de transferência da posição
                    de investimento para Fundos enviado pelo cliente, deverá
                    disponibilizar as informações necessárias ao Distribuidor
                    cessionário (Mirae Asset) em até 2 (dois) dias úteis;
                  </li>
                  <li>
                    b. Distribuidor cessionário (Mirae Asset): ao receber as
                    informações do Distribuidor cedente, deverá disponibilizar
                    ao Administrador Fiduciário as informações necessárias em
                    até 2 (dois) dias úteis para a devida implementação da
                    posição de investimento; e
                  </li>
                  <li>
                    c. Administrador Fiduciário: ao receber as informações do
                    Distribuidor cessionário (Mirae Asset), deverá realizar a
                    transferência de posição em até 3 (três) dias úteis para
                    modalidade conta e ordem e em até 5 (cinco) dias úteis para
                    modalidade direta.
                  </li>
                </span>
                <br />
                <span
                  className={
                    styles["accordion__content__list3__important__baseboard"]
                  }
                >
                  Antes de preencher a solicitação, verifique se a Mirae Asset
                  distribui os fundos em questão. Para isso, acesse{" "}
                  <a
                    href="https://corretora.miraeasset.com.br"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    https://corretora.miraeasset.com.br
                  </a>{" "}
                  e vá em Investimentos {">"} Fundos de Investimento {">"} Lista
                  de fundos. Verifique se os fundos que deseja transferir são
                  distribuídos na Mirae Asset. Cheque também se os CNPJs dos
                  fundos em questão são os mesmos dos fundos distribuídos na
                  Mirae Asset, visto que existem fundos com CNPJs diferentes e
                  nomes semelhantes. Caso o fundo não for distribuído pela outra
                  instituição/cessionária, não será possível efetuar a
                  transferência.
                </span>
              </ul>
            </ul>
          ),
        },
        {
          title: "Previdência privada",
          description: (
            <ul className={styles["accordion__content__list4"]}>
              <li>
                1. Solicite o extrato de sua Previdência na instituição atual;
              </li>
              <br />
              <li>
                2. Verifique em seu extrato se a Previdência é Corporativa
                Aberta¹, Aberta¹ ou Fechada;
              </li>
              <br />
              <li>
                3. Verifique se o extrato contém as informações abaixo:
                <div className={styles["accordion__content__list4__sub-title"]}>
                  <span
                    className={
                      styles["accordion__content__list4__sub-title__content"]
                    }
                  >
                    <li>Nº SUSEP de plano atual</li>
                    <li>CNPJ do fundo atual</li>
                    <li>Nº de Identificação do plano atual²</li>
                    <li>Regime tributário do plano atual</li>
                  </span>
                </div>
              </li>
              <br />
              <li>
                4. Entre na página “Fundos de Previdência” e escolha o fundo
                para onde deseja realizar a portabilidade;
              </li>
              <br />
              <li>
                5. Siga o fluxo de Portabilidade Externa. Sua solicitação será
                enviada à instituição onde sua Previdência está. O prazo para
                conclusão de transferência é de aproximadamente 15 dias corridos
              </li>
              <br />
              <li>
                6. Em caso de dúvidas, entre em contato com as equipes de
                atendimento da Mirae Asset.
              </li>
              <br />
              <span>
                ¹Atualmente, só é possível realizar portabilidades para a Mirae
                Asset quando oriundas de Entidades Abertas (EAPC – Entidades
                Abertas de Previdência Complementar)
              </span>
              <br />
              <span>
                ²A nomenclatura para o número de identificação do Plano varia de
                acordo com a instituição
              </span>
            </ul>
          ),
        },
      ],
    },
    {
      id: 2,
      title: "Saida",
      contents: [
        {
          title: "Todos os ativos",
          description: (
            <ul>
              <li>1. Acesse sua conta na Mirae Asset;</li>
              <br />
              <li>
                2. No Menu Superior, selecione a opção:{" "}
                <strong>
                  Produtos {">"} Portabilidade de Investimentos {">"}{" "}
                  Solicitações de saída;
                </strong>
              </li>
              <br />
              <li>3. Selecione o produto que você deseja transferir;</li>
              <br />
              <li>4. Siga as instruções indicadas.</li>
            </ul>
          ),
        },
        {
          title: "Portabilidade entre Diferentes Titularidades",
          description: (
            <ul>
              <li>
                Por ser um tipo de transferência mais complexa, esse
                procedimento requer uma análise mais apurada dos nossos times
                internos. Por esse motivo, é necessário que você entre em
                contato com seu Assessor para que ele dê andamento na
                solicitação junto à Mirae Asset.
              </li>
              <br />
              <li>
                O prazo para avaliação da documentação recebida é de 7 dias
                úteis. A execução das transferências ocorre em até 10 dias
                úteis.
              </li>
              <br />
              <li>
                Confira abaixo algumas informações que separamos sobre os tipos
                mais comuns de portabilidade de diferentes
                titularidades.Importante
              </li>
              <br />
              <strong> Importante </strong>
              <br />
              <ul
                className={
                  styles["accordion__content__list2__sub-title__important2"]
                }
              >
                <li>
                  Não é possível transferir fundos de investimento entre
                  diferentes titularidades;
                </li>
                <li>
                  Participam do fluxo de diferente titularidade as seguintes
                  áreas internas da Mirae Asset: Fraudes; Controladoria;
                  Jurídico e Portabilidade.
                </li>
                <li>
                  A Mirae Asset não oferece assessoria jurídica. Os documentos
                  mencionados devem ser elaborados juntos ao representante legal
                  do próprio cliente;
                </li>
                <li>
                  A Mirae Asset não realiza venda privada entre pessoas físicas;
                </li>
                <li>
                  A Mirae Asset não realiza doação entre uma Pessoa Física e uma
                  Pessoa Jurídica.
                </li>
              </ul>
              <table className={styles["accordion__content__table"]}>
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Formalização</th>
                    <th
                      className={styles["accordion__content__table__document"]}
                    >
                      Documento Complementar
                    </th>
                    <th>Retenção de Imposto de Renda</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Doação</td>
                    <td>
                      Instrumento Público (Escritura feita em Cartório) ou
                      Contrato Particular de Doação com assinaturas simples à
                      mão, sem necessidade de reconhecimento de firma.
                    </td>
                    <td>
                      <li>Declaração de ITCMD ou de isenção</li>
                      <li>
                        Guia e comprovante de pagamento de ITCMD, quando
                        aplicável
                      </li>
                      <li>STVM com assinatura simples à mão</li>
                      Documento de identificação válido de todos os envolvidos
                    </td>
                    <td>Sim (caso aplicável ao ativo)</td>
                  </tr>
                  <tr>
                    <td>Inventário Judicial</td>
                    <td>
                      <li>Certidão de óbito</li>
                      <li>Plano de Partilha</li>
                      <li>Sentença homologatória da partilha</li>
                      <li>Certidão de Trânsito em Julgado</li>
                      <li>Formal de Partilha.</li>
                    </td>
                    <td>
                      <li>Declaração de ITCMD ou de isenção</li>
                      <li>
                        Guia e comprovante de pagamento de ITCMD, quando
                        aplicável
                      </li>
                      <li>
                        Formulário de Diferente Titularidade para cada herdeiro
                        com assinatura simples do Inventariante à mão
                      </li>
                      <li>
                        Documento de identificação válido do inventariante e de
                        todos os herdeiros
                      </li>
                    </td>
                    <td>
                      Sim, apenas para herdeiros (não incidente aos cônjuges
                      meeiros).
                    </td>
                  </tr>
                  <tr>
                    <td>Inventário Extrajudicial</td>
                    <td>
                      <li>Instrumento Público (Escritura de Inventário)</li>
                      <li>Certidão de óbito.</li>
                    </td>
                    <td>
                      <li>Declaração de ITCMD ou de isenção</li>
                      <li>
                        Guia e comprovante de pagamento de ITCMD, quando
                        aplicável
                      </li>
                      <li>
                        Formulário de Diferente Titularidade para cada herdeiro
                        com assinatura simples do Inventariante à mão
                      </li>
                      <li>
                        Documento de identificação válido do inventariante e de
                        todos os herdeiros
                      </li>
                    </td>
                    <td>
                      Sim, apenas para herdeiros (não incidente aos cônjuges
                      meeiros).
                    </td>
                  </tr>
                  <tr>
                    <td>Divórcio Judicial</td>
                    <td>
                      <li>Plano de partilha</li>
                      <li>Sentença homologatória da partilha</li>
                      <li>Certidão de Trânsito em Julgado</li>
                    </td>
                    <td>
                      <li>STVM com assinatura simples à mão</li>
                      <li>
                        Documento de identificação válido de todos os envolvidos
                      </li>
                    </td>
                    <td>
                      Não, desde que:
                      <p>
                        1. O regime de casamento seja comunhão total/universal
                        de bens
                      </p>
                      <p>
                        2. Nos casos de regime de comunhão parcial, os bens
                        tenham sido adquiridos após o casamento.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>Divórcio Extra Judicial</td>
                    <td>
                      <li>Instrumento Público (Escritura)</li>
                    </td>
                    <td>
                      <li>STVM com assinatura simples à mão</li>
                      <li>
                        Documento de identificação válido de todos os envolvidos
                      </li>
                    </td>
                    <td>
                      Não, desde que:
                      <p>
                        1. O regime de casamento seja comunhão total/universal
                        de bens
                      </p>
                      <p>
                        2. Nos casos de regime de comunhão parcial, os bens
                        tenham sido adquiridos após o casamento.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>Operações de empresas</td>
                    <td>
                      Documentos societários que comprovem a previsão da
                      operação desejada e devidamente registrados na Junta
                      Comercial, se pertinente
                    </td>
                    <td>
                      <li>STVM com assinatura simples à mão</li>
                      <li>
                        Documento de identificação válido de todos os envolvidos
                      </li>
                    </td>
                    <td>Sim (caso aplicável ao ativo).</td>
                  </tr>
                  <tr>
                    <td>Transferência entre Cônjuges</td>
                    <td>
                      Declaração de Transferência entre Cônjuges (modelo Mirae
                      Asset) com assinatura simples à mão de ambas as partes
                    </td>
                    <td>
                      <li>Certidão de Casamento</li>
                      <li>
                        Documento de identificação válido de todos os envolvidos
                      </li>
                    </td>
                    <td>
                      Não, desde que:
                      <p>
                        1. O regime de casamento seja comunhão total/universal
                        de bens
                      </p>
                      <p>
                        2. Nos casos de regime de comunhão parcial, os bens
                        tenham sido adquiridos após o casamento.
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <TableMobile />
            </ul>
          ),
        },
      ],
    },
  ];
};
