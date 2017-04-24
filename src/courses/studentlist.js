import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500} from 'material-ui/styles/colors';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fetchAccounts, toggleEnrollStudent, findStudents} from '../actions';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

const SearchField = styled(TextField)`
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`
const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: right;
`;

class StudentList extends React.Component {
	constructor(props) {
		super(props);
		this.handleSearchKeyPressed = this.handleSearchKeyPressed.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		
		this.state = {searchTerm: '', enrolledList: []};
	}

	async componentDidMount() {
		await this.props.fetchAccounts();
	
		await this.props.findStudents(this.props.course.crs_UIC)
		const l = this.props.students.map((student)=> {
			return {student, checked: this.props.enrolled.some(item=>item.acr_navid === student.navid)}
		})
		this.setState({enrolledList: l});
	}

	handleSearchKeyPressed(e) {
   // If (e.key === 'Enter') {
		this.setState({searchTerm: e.target.value});
   // }
	}

	handleUpdate() {
		const nr = this.state.enrolledList.reduce((total, item)=>item.checked? total+1:total, 0)
		this.props.onCount(nr)
	}


	render() {
    //
		if (!this.props.students) {
			return <div>Loading....</div>;
		}
		const {searchTerm} = this.state;
		const { course} = this.props;
		const studentList = this.props.students.filter(student => student.fullname.toUpperCase().includes(searchTerm.toUpperCase()) || student.team.toUpperCase().includes(searchTerm.toUpperCase()));
		return (
			<div>
			  <Paper zDepth={3} >
        <FontIcon className="material-icons" >
					<SearchField hintText="Search" underlineShow={false} onKeyPress={this.handleSearchKeyPressed}/>
			</FontIcon>
			</Paper>
				<List>
					<Divider/>
					{this.state.enrolledList.map((item, index) => {
						const {uic, picture, fullname, location, team, navid} = item.student;
						const enabled = item.checked;
						return (
							<Container key={uic}>
									<ListItem
										leftAvatar={
											<Avatar src={picture}/>
                  }
										primaryText={fullname}
										secondaryText={`located in ${location}, in team ${team}`}
										/>
                    <CheckBoxContainer>
                <Checkbox 
                  checkedIcon={ <ActionFavorite color={red500}/> } 
                  uncheckedIcon={ <ActionFavoriteBorder /> } 
                  label="Enrolled" 
                  checked={enabled}
                  onCheck={()=>{
										let val = { acr_navid: navid, acr_crs_UIC: course.crs_UIC }
										const o = this.state.enrolledList;
									
										this.props.toggleEnrollStudent(val);
										o[index].checked = (o[index].checked)? false: true;
										this.setState({enrolledList: o});
										this.handleUpdate();
								}}
                />
                </CheckBoxContainer>
								<Divider/>
							</Container>
						);
					}
          )}
				</List>
			</div>
		);
	}

}

StudentList.defaultProps = {
	students: []
};

StudentList.propTypes = {
	students: React.PropTypes.array,
	fetchAccounts: React.PropTypes.func
};

const mapStateToProps = state => {
	console.dir(state);
	return {enrolled: state.courses.students, students: state.main.accounts.filter(account =>
       account.region === 'EMEA' && (account.team ==='TLS' || account.team ==='LOG' || account.team ==='FIN')
      ).sort((a,b)=> a.fullname>b.fullname)};
};

export default connect(mapStateToProps, {fetchAccounts, toggleEnrollStudent, findStudents})(StudentList);

