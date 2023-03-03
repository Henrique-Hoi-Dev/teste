import styles from "./styles.module.scss";

export function TableMobile() {
  return (
    <div className={styles["table-mobile"]}>
      <div className={styles["table-mobile__column"]}>
        <div>
          <h5>Evento</h5>
          <span>
            Doação
          </span>          
        </div>
        <div>
          <h5>Formalização</h5>
          <span>
            Instrumento Público (Escritura feita em Cartório) ou Contrato Particular de Doação 
            com assinaturas simples à mão, sem necessidade de reconhecimento de firma.
          </span>          
        </div>
        <div>
          <h5>Documento Complementar</h5>
          <span>
            <li>Declaração de ITCMD ou de isenção</li>
            <li>Guia e comprovante de pagamento de ITCMD, quando aplicável</li>
            <li>STVM com assinatura simples à mão</li>
            Documento de identificação válido de todos os envolvidos
          </span>          
        </div>
        <div>
          <h5>Retenção de Imposto de Renda</h5>
          <span>
            Sim (caso aplicável ao ativo)
          </span>          
        </div>
      </div>

      <div className={styles["table-mobile__column"]}>
        <div>
          <h5>Evento</h5>
          <span>
            Inventário Judicial
          </span>          
        </div>
        <div>
          <h5>Formalização</h5>
          <span>
            <li>Certidão de óbito</li>
            <li>Plano de Partilha</li>
            <li>Sentença homologatória da partilha</li>
            <li>Certidão de Trânsito em Julgado</li>
            <li>Formal de Partilha.</li>
          </span>          
        </div>
        <div>
          <h5>Documento Complementar</h5>
          <span>
            <li>Declaração de ITCMD ou de isenção</li>
            <li>Guia e comprovante de pagamento de ITCMD, quando aplicável</li>
            <li>Formulário de Diferente Titularidade para cada herdeiro com assinatura simples do Inventariante à mão</li>
            <li>Documento de identificação válido de todos os envolvidos</li>
          </span>          
        </div>
        <div>
          <h5>Retenção de Imposto de Renda</h5>
          <span>
            Sim, apenas para herdeiros (não incidente aos cônjuges meeiros).
          </span>          
        </div>
      </div>

      <div className={styles["table-mobile__column"]}>
        <div>
          <h5>Evento</h5>
          <span>
            Inventário Extrajudicial
          </span>          
        </div>
        <div>
          <h5>Formalização</h5>
          <span>
            <li>Instrumento Público (Escritura de Inventário)</li>
            <li>Certidão de óbito.</li>
          </span>          
        </div>
        <div>
          <h5>Documento Complementar</h5>
          <span>
            <li>Declaração de ITCMD ou de isenção</li>
            <li>Guia e comprovante de pagamento de ITCMD, quando aplicável</li>
            <li>Formulário de Diferente Titularidade para cada herdeiro com assinatura simples do Inventariante à mão</li>
            <li>Documento de identificação válido de todos os envolvidos</li>
          </span>          
        </div>
        <div>
          <h5>Retenção de Imposto de Renda</h5>
          <span>
            Sim, apenas para herdeiros (não incidente aos cônjuges meeiros).
          </span>          
        </div>
      </div>

      <div className={styles["table-mobile__column"]}>
        <div>
          <h5>Evento</h5>
          <span>
            Divórcio Judicial
          </span>          
        </div>
        <div>
          <h5>Formalização</h5>
          <span>
            <li>Plano de partilha</li>
            <li>Sentença homologatória da partilha</li>
            <li>Certidão de Trânsito em Julgado</li>
          </span>          
        </div>
        <div>
          <h5>Documento Complementar</h5>          
          <span>
            <li>STVM com assinatura simples à mão</li>
            <li>Documento de identificação válido de todos os envolvidos</li>
          </span>          
        </div>
        <div>
          <h5>Retenção de Imposto de Renda</h5>
          <span>
            Não, desde que:
            <p>1. O regime de casamento seja comunhão total/universal de bens</p>
            <p>2. Nos casos de regime de comunhão parcial, os bens tenham sido adquiridos após o casamento.</p>
          </span>          
        </div>
      </div>

      <div className={styles["table-mobile__column"]}>
        <div>
          <h5>Evento</h5>
          <span>
            Divórcio Extra Judicial
          </span>          
        </div>
        <div>
          <h5>Formalização</h5>
          <span>
            <li>Instrumento Público (Escritura)</li>
          </span>          
        </div>
        <div>
          <h5>Documento Complementar</h5>          
          <span>
            <li>STVM com assinatura simples à mão</li>
            <li>Documento de identificação válido de todos os envolvidos</li>
          </span>          
        </div>
        <div>
          <h5>Retenção de Imposto de Renda</h5>
          <span>
            Não, desde que:
            <p>1. O regime de casamento seja comunhão total/universal de bens</p>
            <p>2. Nos casos de regime de comunhão parcial, os bens tenham sido adquiridos após o casamento.</p>
          </span>          
        </div>
      </div>

      <div className={styles["table-mobile__column"]}>
        <div>
          <h5>Evento</h5>
          <span>
            Operações de empresas
          </span>          
        </div>
        <div>
          <h5>Formalização</h5>
          <span>
            Documentos societários que comprovem a previsão da operação desejada e 
            devidamente registrados na Junta Comercial, se pertinente
          </span>          
        </div>
        <div>
          <h5>Documento Complementar</h5>          
          <span>
            <li>STVM com assinatura simples à mão</li>
            <li>Documento de identificação válido de todos os envolvidos</li>
          </span>          
        </div>
        <div>
          <h5>Retenção de Imposto de Renda</h5>
          <span>
            Sim (caso aplicável ao ativo).
          </span>          
        </div>
      </div>

      <div className={styles["table-mobile__column"]}>
        <div>
          <h5>Evento</h5>
          <span>
            Transferência entre Cônjuges
          </span>          
        </div>
        <div>
          <h5>Formalização</h5>
          <span>
            Declaração de Transferência entre Cônjuges (modelo Mirae Asset)
            com assinatura simples à mão de ambas as partes
          </span>          
        </div>
        <div>
          <h5>Documento Complementar</h5>          
          <span>
            <li>Certidão de Casamento</li>
            <li>Documento de identificação válido de todos os envolvidos</li>
          </span>          
        </div>
        <div>
          <h5>Retenção de Imposto de Renda</h5>
          <span>
            Não, desde que:
            <p>1. O regime de casamento seja comunhão total/universal de bens</p>
            <p>2. Nos casos de regime de comunhão parcial, os bens tenham sido adquiridos após o casamento.</p>
          </span>          
        </div>
      </div>

    </div>
  )
}