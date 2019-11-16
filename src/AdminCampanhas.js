import React, {Component} from 'react';
import base from './base';

class AdminCampanhas extends Component{

    constructor(props){
        super(props)
        this.state = {
            campanhas: {}
        }

        this.removeCampanha = this.removeCampanha.bind(this);
        this.renderCampanha = this.renderCampanha.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        base.syncState('campanhas', {
            context: this,
            state: 'campanhas',
            asArray: false
        })
    }

    removeCampanha(id){
        base.remove('campanhas/'+id);
    }

    renderCampanha(key, campanha){
        return (
            <li key={key}>
                {campanha.nome} &nbsp;
                <button onClick={()=>{}}>Editar</button> &nbsp;
                <button onClick={()=>this.removeCampanha(key)}>Remover</button>
            </li>

        )
    }

    handleSave(){
        const nome = this.nome.value;
        const descricao = this.descricao.value;
        const tipo = this.state.tipo;
        const comoDoar = this.state.tipo === 'produtos' ? this.comoDoar.value : null;
        const meta = this.state.tipo === 'doacao' ? this.meta.value : null;
        const doado = this.state.tipo === 'doacao' ? this.doado.value : null;

        base.push('campanhas', {
            data:{nome: nome, descricao: descricao, tipo: tipo, comoDoar: comoDoar, meta: meta, doado: doado},
            then: err =>{
                if(!err){
                    this.nome.value = "";
                    this.descricao.value= "";
                    this.subtitulo.value= "";
                    this.setState({tipo: ''});
                    if(this.meta){
                        this.meta.value = "";
                    }
                    if(this.doado){
                        this.meta.doado = "";
                    }
                    if(this.comoDoar){
                        this.meta.comoDoar = "";
                    }
                }
            }
        });
    }

    render(){
        return(
            <div>
                <h1>Campanhas</h1>
                <h2>Nova Campanha</h2>
                Campanha: <input type="text" ref={ref=>this.nome = ref} /> <br/>
                Sub-Título: <input type="text" ref={ref=>this.subtitulo = ref} /> <br/>
                Descrição: <textarea type="text" ref={ref=>this.descricao = ref} /> <br/>
                Tipo: <br/>
                <label htmlFor="doacao">
                    <input type='radio' id="doacao" name='tipo' onClick={()=>this.setState({tipo: "doacao"})} />Doação
                </label>
                <br/>
                <label htmlFor="produtos">
                <input type='radio' id="produtos" name='tipo' onClick={()=>this.setState({tipo: "produtos"})} />Produtos
                </label>
                <br/>
                {this.state.tipo === "doacao" &&
                <div>
                    <h4>Doação</h4>
                    Meta: <input type="text" ref={ref=>this.meta = ref} /><br/>
                    Doado: <input type="text" ref={ref=>this.doado = ref} defaultValue={0} />
                </div>
                }
                {this.state.tipo === "produtos" &&
                <div>
                    <h4>Produtos</h4>
                    Como Doar: <input type="text" ref={ref=>this.comoDoar = ref} />
                </div>
                }
                <button onClick={this.handleSave}>Salvar Nova Campanha</button>
                <ul>
                    {
                        Object.keys(this.state.campanhas)
                        .map(key=> this.renderCampanha(key, this.state.campanhas[key]))
                    }
                </ul>
            </div>
        )
    }
}

export default AdminCampanhas;