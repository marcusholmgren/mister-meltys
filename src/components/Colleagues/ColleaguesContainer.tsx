import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Dispatch } from 'redux';
import {actions as employeesActions} from '../../ducks/employees'
import Colleagues from "./Colleagues";

// Assuming PersonData and ColleaguesProps (equivalent to EmployeesState) are defined elsewhere or implicitly by Colleagues component
// For clarity here, let's define what EmployeesState would look like based on Colleagues.tsx usage.
interface PersonData {
  picture: {
    thumbnail: string;
  };
  name: {
    first: string;
  };
  status: string;
}

interface EmployeesState {
  loading: boolean;
  error?: string | null;
  data?: PersonData[];
}

interface ColleaguesContainerProps {
  employees: EmployeesState;
  fetchEmployees: () => void; // This is a thunk, so it dispatches. Return type could be more specific if needed.
}

interface RootState {
  employees: EmployeesState;
  // Add other state slices here as they are typed
}



class ColleaguesContainer extends Component<ColleaguesContainerProps> {
    componentDidMount() {
        this.props.fetchEmployees();
    }
    render() {
        return (
            <Colleagues {...this.props.employees}/>
        );
    }
}


const mapStateToProps = (state: RootState) => ({
    employees: state.employees
})


const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchEmployees:  () => dispatch(employeesActions.fetchEmployees() as any) // Cast to any for now if fetchEmployees thunk type is complex
});



export default connect(mapStateToProps, mapDispatchToProps)(ColleaguesContainer);