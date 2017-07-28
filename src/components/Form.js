import React from 'react';
import validation from '../utils/validation';

export default class Main extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = this.getInitState()
    }

    getInitState() {
        return {
            firstName: '',
            firstNameError: false,
            lastName: '',
            lastNameError: false,
            phone: '',
            phoneError: false,
            gender: 'Male',
            age: '',
            ageError: false,

            isValidationDone: ''
        }
    }

    handleChange(e, field) {
        const errorMessage = validation(e.target.value, field)
        const fieldError = field + 'Error';

        this.setState({ [field]: e.target.value, [fieldError]: errorMessage })
    }

    handleBlur(e, field) {
        const errorMessage = validation(e.target.value, field)
        const fieldError = field + 'Error';

        this.setState({ [fieldError]: errorMessage })
    }

    onAddField(e) {
        e.preventDefault();

        if(this.state.firstNameError === '' && this.state.lastNameError === '' && this.state.phoneError === '' && this.state.ageError === '') {

            this.props.addField(
                this.state.firstName,
                this.state.lastName,
                this.state.phone,
                this.state.gender,
                this.state.age
            );

            this.setState({ ...this.getInitState() })
        } else {
            this.setState({ isValidationDone: 'Please, fill all fields correctly!' })
            setTimeout(() => {
                this.setState({ isValidationDone: '' })
            }, 2500)
        }
    }

    render() {
        const {firstName, firstNameError, lastName, lastNameError, phone, phoneError, gender, age, ageError,
            isDisabled} = this.state;

        return (
            <form onSubmit={this.onAddField.bind(this)}>
                <div className={`form-group ${firstNameError ? 'has-error' : '' }`}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => this.handleChange(e, 'firstName')}
                        onBlur={e => this.handleBlur(e, 'firstName')}
                    />
                    <span className="help-block">{firstNameError}</span>
                </div>
                <div className={`form-group ${lastNameError ? 'has-error' : '' }`}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => this.handleChange(e, 'lastName')}
                        onBlur={e => this.handleBlur(e, 'lastName')}
                    />
                    <span className="help-block">{lastNameError}</span>
                </div>
                <div className={`form-group ${phoneError ? 'has-error' : '' }`}>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={e => this.handleChange(e, 'phone')}
                        onBlur={e => this.handleBlur(e, 'phone')}
                    />
                    <span className="help-block">{phoneError}</span>
                </div>
                <div className="form-group">
                    <label className="radio-inline">
                      <input type="radio"
                          value="Male"
                          onChange={e => this.handleChange(e, 'gender')}
                          checked={gender === 'Male'}
                      />
                      Male
                    </label>
                    <label className="radio-inline">
                      <input type="radio"
                          value="Female"
                          onChange={e => this.handleChange(e, 'gender')}
                          checked={gender === 'Female'}
                      />
                      Female
                    </label>
                </div>
                <div className={`form-group ${ageError ? 'has-error' : '' }`}>
                    <label htmlFor="age">Age</label>
                    <input type="number"
                        className="form-control"
                        id="age"
                        placeholder="Age"
                        value={age}
                        onChange={e => this.handleChange(e, 'age')}
                        onBlur={e => this.handleBlur(e, 'age')}
                    />
                    <span className="help-block">{ageError}</span>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
                <div className="has-error">
                    <span className="help-block">{this.state.isValidationDone}</span>
                </div>
            </form>
        );
    }
}
