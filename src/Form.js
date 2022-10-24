import React from "react";

class Form extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            listStructState: []
        }
        this.titleRef="";
        this.descriptionRef="";
        this.myFormRef="";
    }
    
    onFormSumbit(e){
        e.preventDefault();
        let _listStructState= JSON.parse(JSON.stringify(this.state.listStructState)); 
        let title= this.titleRef.value;
        let description= this.descriptionRef.value;

        this.titleRef.value="";
        this.descriptionRef.value="";

        _listStructState.push({
            edited:"Edit",
            title:title,
            description:description})

        this.setState({
            
            listStructState : _listStructState

        })
    }
    onFormReset(e){
        e.preventDefault();
        this.myFormRef.reset();
        
    }

    onFormEdit(todoIdx,e){
        e.preventDefault();
        let _listStructState= JSON.parse(JSON.stringify(this.state.listStructState)); 
        let title = _listStructState[todoIdx].title;
        this.titleRef.value= title;
        let description= this.descriptionRef.value;
        let status= _listStructState[todoIdx].edited;

        if(status === "Edit"){
            status="Update";
        }
        else{
            status="Edit";
        }
        
        _listStructState.splice(todoIdx,1);
        _listStructState.splice(todoIdx,0,{edited:status ,title: title, description:description});
   
        
        this.setState({ 
            listStructState : _listStructState
        })

        if(status === "Edit"){
            this.titleRef.value="";
            this.descriptionRef.value="";
        }
        
    }
    onFormDelete(todoIdx,e){
        e.preventDefault();
        let _listStructState= JSON.parse(JSON.stringify(this.state.listStructState)); 
        _listStructState.splice(todoIdx,1);
        this.setState({
            listStructState : _listStructState

        })
        
    }
    render(){
        const listStructState= this.state.listStructState;
        return(
            <div>
                <form onSubmit={this.onFormSumbit.bind(this)} ref={(el) => this.myFormRef = el}>
                    <h1 className="text-center"> Simple Todo List App</h1>
                    <div className="ms-5  pb-3 col-2">
                        <label htmlFor="title" >Title</label>
                        <input className="form-control"
                         ref ={(ref) => this.titleRef=ref}
                         type="text "
                         id="title"></input>
                    </div>
                    <div className="ms-5 pd-3 col-3">
                        <label htmlFor="Description" >Description</label>
                        <textarea 
                          className="form-control"
                          ref ={(ref) => this.descriptionRef=ref}
                          id="Description"
                          rows="3" >

                        </textarea>
                    </div>
                    <div className="ms-5 pt-5 ">
                        <button className="btn btn-primary me-4" type="sumbit" >Add</button>
                        <button className="btn btn-primary" onClick={this.onFormReset.bind(this)} type="button">Reset</button>
                    </div>
                    
                </form>
                <div >
                   {listStructState.map((todo,idx)=>
                    {
                    
                            return(
                                <div key={idx}  className=" ms-5 mt-5 mb-3">
                                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-1 border-bottom"></div>
                                <h2 className="text "> {todo.title}</h2>
                                <p className="text fs-5 fst-normal lh-base" >{todo.description}</p>
                                    <div>
                                        <button className="btn btn-primary me-4" onClick={this.onFormEdit.bind(this,idx)}type="sumbit" >{todo.edited }</button>
                                        <button className="btn btn-primary" onClick={this.onFormDelete.bind(this,idx)} type="reset">Delete</button>  
                                    </div> 
                                </div>
                            )
                        
                    })}
                    
                </div>
            </div>
        )
    }
}
export default Form;