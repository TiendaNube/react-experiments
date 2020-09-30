### Requisitos
- React +16.13.0
- Conhecimento de Hooks
- Conhecimento de Context

### Adicionando lib ao projeto
```
yarn add @tiendanube/react-experiments
```

### Configurando o Context
A primeira coisa a fazer é configurar o Context passando os parametros de controle de exibicão dos experimentos.
Deve-se importar o ProviderExperiment, na raiz englobando seu projeto.

##### experiments
Essa prop recebe um objeto com a segunte chave e valor:
{
  name_do_experiento: 'variavel_ativa'
}
Exemplo:
```js
experiments = { teste_sidebar: 'a' }
```

##### methodParams
Essa prop recebe o method de persistencia dos dados que serão coletados no teste:

```js
  method = (nameEvent, variant, extra) => {
    return (
      $ajax('url-do-uru', {
        nameEvent,
        variant,
        extra
      })
    )
  }
```

##### ProviderExperiment
```jsx
import { ProviderExperiment } from '@tiendanube/react-experiments'

<ProviderExperiment
  experimentsParams={experiments}
  methodParams={this.method}
>
  <app> <- seu projeto
</ProviderExperiment>
```

### Experiment
Após configurar o Provider, vamos a implementação do teste, temos duas props:
name = Nome do experimento deve conter nos experimentos informados no provider
variant = Qual variante daquele component.

```jsx
import { Experiment } from '@tiendanube/react-experiments'

<Experiment
  name="teste_sidebar"
  variant="a"
>
  <ComponentA />
</Experiment>
```

### useEmitter

Para utilizar o hook de evento é muito simples, você precisar extrair a função "execute" dentro dele da seguinte forma:

```jsx
import { useEmitter } from '@tiendanube/react-experiments'
const { execute } = useEmitter('name_experiment', {variaveis_extras});

<button type="button" onClick={execute}>Test Event Hook</button>
```
Obs. O segundo parametro do Hook é para você conseguir passar parametros extras de controle do seu teste, seja ele um objeto com várias informações ou até mesmo uma string.