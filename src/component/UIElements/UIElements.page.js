import React, { Component } from 'react';
import { connect } from 'react-redux';
import RowSelectTable from 'mui-row-select-table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as mui from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';

import { UIElelmentsActions } from '../../actions/uielements.actions';
import locale from '../../utils/locale';

injectTapEventPlugin();

const column = (name, headerCellContent, other = {}) => ({
  name,
  headerCellContent,
  sortable: true,
  ...other
})

//const results = this.props.users;

const results = [
  { id: 0, first_name: 'Leia', last_name: 'Skywalker', home_planet: 'Naboo' },
  { id: 1, first_name: 'Darth', last_name: 'Vader', home_planet: 'Tatooine' },
  {
    id: 2,
    first_name: 'Luke',
    last_name: 'Skywalker',
    home_planet: 'Tatooine'
  },
  { id: 3, first_name: 'Han', last_name: 'Solo', home_planet: 'Unknown' },
  { id: 4, first_name: 'Rey', last_name: '', home_planet: 'Jakku' },
  { id: 5, first_name: 'Kylo', last_name: 'Ren', home_planet: 'Unknown' }
]

const renderAction = () => <i className="material-icons">remove_red_eye</i>

const AppbarStyles = () => getMuiTheme({
  palette: {
    primary1Color: '#f4511e'
  }
});

const getColumnMetadata = () => [
  column('name', locale('name'), {}),
  column('username', locale('user-name'), {}),
  column('email', locale('email'), {}),
  column('phone', locale('phone'), {}),
  column('website', locale('website'), {}),
];

class UIElementsPage extends Component {
  constructor(props){
    super(props);
    /*this.state={
      currentPage: 0,
      showMenu: false,
      open: false,
      popupDetails: {
        selectedUserId: 0,
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      }
    }*/

    this.state={
      currentPage: 0,
      showMenu: false,
      open: false,
      createUserPopupOpen:false,
      selectedUserId: 0,
      id: 0,
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      createUser: {
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }

      }
    }

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
      const { name, value } = e.target;
      /*this.setState({
        popupDetails:
          {
            [name]: value
          }
      });*/

      this.setState({
        [name]: e.target.value
      });

      //e.preventDefault();
  }

  handleCreateUserChange(e) {
    const { name, value } = e.target;
    // this.setState({
    //   ...this.state,
    //   createUser: {
    //     [name]: e.target.value
    //   }
    // });

    this.setState({
      ...this.state,
        createUser: {
          ...this.state.createUser,
          [name]: e.target.value,
        }
    });

  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {

    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });

  }

  handleClickOpen = (e, data) => {

    /*this.setState({
      open: true,
      popupDetails:
      {
        selectedUserId: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        website: data.website,
      }
    }); */

    this.setState({
      open: true,
      selectedUserId: data.id,
      id: data.id,
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
    });

  };

  // defaultUserObject = () => {
  //   this.setState({
  //     createUser: {
  //       name: "",
  //       username: "",
  //       email: "",
  //       address: {
  //           street: "",
  //           suite: "",
  //           city: "",
  //           zipcode: "",
  //           geo: {
  //               lat: "",
  //               lng: ""
  //           }
  //       },
  //       phone: "",
  //       website: "",
  //       company: {
  //           name: "",
  //           catchPhrase: "",
  //           bs: ""
  //       }
  //     }
  //   });
  // }

  handleCreateUserPopupOpen = (e) => {

    this.setState({
      createUserPopupOpen: true,
      createUser: {
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
      }
    });

  };

  handleCreateUserClose = (e, data) => {

    this.setState({
      createUserPopupOpen: false,
      createUser: {
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }
      }
    });

  };

  handleClose = (e) => {

    this.setState({
      open: false,
      selectedUserId : 1,
      id: 1,
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    });

  };

  handleUpdate = (e) => {
    let popupDetails = {
      id: this.state.id,
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      website: this.state.website,
    }
    this.props.updateUser(popupDetails, this.state.id);
    //this.props.updateUser(this.props.selectedUsers, popupDetails, this.state.id);
    //this.props.getUsersPerPage(this.state.currentPage);
    this.handleClose();
    //setTimeout(this.forceUpdate(), 5000);
    //this.forceUpdate();
    //setTimeout(this.props.getUsersPerPage(this.state.currentPage), 5000) ;
  }

  handleCreateUser = () => {
    let createUserDetails = {
      id: this.state.createUser.id,
      name: this.state.createUser.name,
      username: this.state.createUser.username,
      email: this.state.createUser.email,
      phone: this.state.createUser.phone,
      website: this.state.createUser.website,
    }
    this.props.createUser(createUserDetails);
    //this.props.updateUser(this.props.selectedUsers, popupDetails, this.state.id);
    //this.props.getUsersPerPage(this.state.currentPage);
    this.handleCreateUserClose();
    //setTimeout(this.forceUpdate(), 5000);
    //this.forceUpdate();

    //setTimeout(this.props.getUsersPerPage(this.state.currentPage), 5000) ;
  }

  componentWillMount() {
    this.props.getUsersPerPage(0);
    //this.props.getUsersLength();
  }

  handleTouchTap(e) {
    console.log("touchTap", e);
  }

  sortingTable(sortColumn, sortAscending) {
    console.log("============================");
    console.log(sortColumn, sortAscending);
    console.log("============================");
  }

  setPageDynamically(e) {
    console.log('this.props: ', this.props);
    //console.log('setPageDynamically: ', e);
    this.props.getUsersPerPage(e.page);
    this.setState({
      currentPage:e.page,
    })
  }



  render() {
    //console.log("this.props.getUsersLength(): ", this.props.getUsersLength());
    //console.log("this.props: ", this.props.users);
    const newButtonStyle = {
      display: "inline-block",
      float: "right",
    }
    const noDataMessage = locale('There is no data to display');
    return(
      <div className="container">
        <div className="add-user">
          <Tooltip id="tooltip-fab" title={locale('create-user')}>
            <Button style={newButtonStyle} variant="fab" color="primary" aria-label="Add" onClick={(e) => this.handleCreateUserPopupOpen(e)} className="AddIcon">
              <AddIcon />
            </Button>
          </Tooltip>
        </div>

        <div>
          <div className="Table">
            <div> {locale('ui-elements-page')} </div>
            <MuiThemeProvider muiTheme={AppbarStyles()}>
              <RowSelectTable
                columnMetadata={getColumnMetadata()}
                getRowId={rowData => rowData.id}
                noDataMessage={this.noDataMessage}
                setPage={ (e) => this.setPageDynamically(e) }
                onTouchTap={this.handleTouchTap}
                onRowClick={(rowData, e) => {this.handleClickOpen(e, rowData); console.log('Row Clicked')}}
                results={this.props.selectedUsers}
                isLoading={false}
                changeSort={(sortColumn, sortAscending ) => {this.sortingTable(sortColumn, sortAscending )}}
                setFilter={() => {}}
                maxPage={Math.ceil(this.props.usersLength/2)}
                pageSize={2}
                currentPage={this.state.currentPage}
                pageSizeOptions={[5, 10, 20, 50, 100]}
              />
            </MuiThemeProvider>
          </div>
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-update-user" >
              <DialogTitle id="form-dialog-update-user">{locale('update-user')}</DialogTitle>
              <DialogContent>
                {/*<DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send
                  updates occasionally.
                </DialogContentText>*/}
                {/*<TextField name="username" label="User Name" margin="normal" value={this.state.popupDetails.username} onChange={this.handleChange} />*/}
                <TextField autoFocus  margin="normal" name="name" id="name" label={locale('name')} type="text" value={this.state.name} onChange={(e) => this.handleChange(e)} fullWidth />
                <TextField margin="normal" name="username" id="username" label={locale('user-name')} type="text" value={this.state.username} onChange={(e) => this.handleChange(e)} fullWidth />
                <TextField margin="normal" name="email" id="email" label={locale('email-address')} type="email" value={this.state.email} onChange={(e) => this.handleChange(e)} fullWidth />
                <TextField margin="normal" name="phone" id="phone" label={locale('phone-number')} type="text" value={this.state.phone} onChange={(e) => this.handleChange(e)} fullWidth />
                <TextField margin="normal" name="website" id="website" label={locale('website')} type="text" value={this.state.website} onChange={(e) => this.handleChange(e)} fullWidth />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary"> {locale('cancel')} </Button>
                <Button onClick={(e) => this.handleUpdate(e)} color="primary"> {locale('update')} </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="create-user">
            <Dialog
              open={this.state.createUserPopupOpen}
              onClose={this.handleCreateUserPopupClose}
              aria-labelledby="form-dialog-create-user">
              <DialogTitle id="form-dialog-create-user">{ locale('create-user') }</DialogTitle>
              <DialogContent>
                {/*<DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send
                  updates occasionally.
                </DialogContentText>*/}
                {/*<TextField name="username" label="User Name" margin="normal" value={this.state.popupDetails.username} onChange={this.handleChange} />*/}
                <TextField autoFocus  margin="normal" name="name" id="createUsername" label={locale('name')} type="text" value={this.state.createUser.name} onChange={(e) => this.handleCreateUserChange(e)} fullWidth />
                <TextField margin="normal" name="username" id="createUserusername" label={locale('user-name')} type="text" value={this.state.createUser.username} onChange={(e) => this.handleCreateUserChange(e)} fullWidth />
                <TextField margin="normal" name="email" id="createUseremail" label={locale('email-address')} type="email" value={this.state.createUser.email} onChange={(e) => this.handleCreateUserChange(e)} fullWidth />
                <TextField margin="normal" name="phone" id="createUserphone" label={locale('phone-number')} type="text" value={this.state.createUser.phone} onChange={(e) => this.handleCreateUserChange(e)} fullWidth />
                <TextField margin="normal" name="website" id="createUserwebsite" label={locale('website')} type="text" value={this.state.createUser.website} onChange={(e) => this.handleCreateUserChange(e)} fullWidth />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCreateUserClose} color="primary"> {locale('cancel')} </Button>
                <Button onClick={(e) => this.handleCreateUser(e)} color="primary"> {locale('create-user')} </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
    const { userDetails, isLoggedIn } = state.dashboard;
    const { users, selectedUsers, usersLength } = state.uielements;

    console.log("state: ", state);
    return {
        userDetails,
        isLoggedIn,
        users,
        selectedUsers,
        usersLength,
    };
}

const mapDispatchToProps = {
  getUsers: UIElelmentsActions.getUsers,
  getUsersPerPage: UIElelmentsActions.getUsersPerPage,
  getUsersLength: UIElelmentsActions.getUsersLength,
  updateUser: UIElelmentsActions.updateUser,
  createUser: UIElelmentsActions.createUser,
}

const connectedUIElementsPage = connect(mapStateToProps, mapDispatchToProps)(UIElementsPage);
export { connectedUIElementsPage as UIElementsPage };
