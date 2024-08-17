# Aplicação de LLM com RAG para pré-sentença de processos ambientais

# Integrantes
* Cesar Hideki Imai
* João Victor Dallapé Madeira
* David Varão Lima Bentes Pessoa


# Introdução

## Desafios na pré-sentença de processos
* **Excesso de processos** - O Judiciário enfrenta uma sobrecarga significativa de casos. Em 2012, cerca de 92 milhões de processos tramitaram no sistema judiciário brasileiro, o que equivale a aproximadamente um processo para cada dois habitantes. No entanto, o acesso à Justiça ainda é limitado, pois a maioria dos processos está concentrada em grandes litigantes, como o setor público, o sistema financeiro e empresas de telefonia. Apenas cerca de 5% dos processos são de cidadãos comuns.
* **Morosidade** - A demora na resolução dos processos é um problema crítico. Em média, um processo leva 10 anos para ser concluído, o que não é um tempo razoável. Além disso, há uma visão equivocada de que o primeiro e o segundo grau de jurisdição são apenas etapas do processo, com a solução sendo dada pelos tribunais superiores.
* **Falta de acesso à Justiça** - Apesar do grande número de profissionais ligados ao sistema de Justiça (magistrados, advogados, estudantes de direito, etc.), ainda há uma lacuna na oferta de serviços jurídicos. Apenas seis mil defensores públicos atendem a demanda, o que é insuficiente para garantir acesso igualitário à Justiça.

## Introdução ao uso de LLMs (Large Language Models) e RAG (Retrieval Augmented Generation)
Um modelo de linguagem é um modelo probabilístico de texto, no qual é calculado uma distribuição de pesos sobre as palavras conhecidas no seu vocabulário para gerar uma resposta influenciada por uma entrada de sequência de texto. Portanto Modelos Largos de Linguagem ou Modelos de Linguagem de Grande Escala (LLMs) seriam modelos de linguagem com um grande número de parâmetros, porém não há uma medida certa para se considerar um modelo largo e comumente o seu termo é usado para se referir a modelos de geração de texto no geral, além disso modelos menores como Bert podem também ser usados de referência para LLMs.

> Eu pedi para os meus pais um animal de estimação, eles me deram um ____

Palavra|Probabilidade
---|---
Gato|0.20
Cachorro|0.25
Peixe|0.35
Cabra|0.05
Macaco|0.02


## Benefícios da aplicação de LLM e RAG neste contexto

## Implementação e integração do sistema de pré-sentença
