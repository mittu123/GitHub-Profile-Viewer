import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Profiles from './github/Profiles.jsx';
import Search from './github/Search.jsx';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: 'prakashuppu123',
            userData:[],
            userRepos:[],
            perpage: 5
        }
    }
    getuserData(){
        $.ajax({
            url:'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.cllientId+'&client_secret='+this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userData:data});
            }.bind(this),
            error:function(xhr,status,err){
                this.setState({username:null});
                alert(err);
            }.bind(this)
        })
    }
    //Get Repos
    getuserRepos(){
        $.ajax({
            url:'https://api.github.com/users/'+this.state.username+'/repos?per_page'+this.state.perpage+'&client_id='+this.props.cllientId+'&client_secret='+this.props.clientSecret+'&sort=created',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userRepos:data});
                console.log(data);
            }.bind(this),
            error:function(xhr,status,err){
                this.setState({username:null});
                alert(err);
            }.bind(this)
        })
    }

    componentDidMount(){
        this.getuserData();
        this.getuserRepos();
    }
    handleformsubmit(username){
        this.setState({username:username}, function () {
            this.getuserData();
            this.getuserRepos();
        });
   }

    render(){
        return(
            <div>
                <Search onSubmitForm={this.handleformsubmit.bind(this)}/>
                <Profiles {...this.state}/>
            </div>
        )
    }
}

App.propTypes={
    cllientId:React.PropTypes.string,
    clientSecret:React.PropTypes.string
}

App.defaultProps={
    cllientId:'f675401ea76dc5ea5cd9',
    clientSecret:'5bf02f1b5cc5b393e43a03aef0417c9d8d51f0b6'
}
export default App;