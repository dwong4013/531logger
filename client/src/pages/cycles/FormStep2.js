import React from 'react'
import { useForm } from 'react-hook-form';
import { createCycle } from '../../actions/cycles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Input from '../../components/forms/Input';

function FormStep2({ formUtils, createCycle, formState, setFormState, modal, setModal, handleBack }) {
    const { register, handleSubmit, formState: { errors } } = formUtils

    const onSubmit = (data) => {
        setFormState({
            ...formState,
            currentStepIndex: formState.currentStepIndex + 1,
        })
        };

    return (
        <div className="modal-background">
            <div className="modal-form-container container-flex container-vertical">
                <div className='toolbar'>
                    <button onClick={()=> setModal(!modal)} className="toolbar-right btn btn-small-action btn-dark"><i className="fa-solid fa-xmark"/></button>
                </div>
                <div className='modal-form-items container-flex container-vertical container-vertical-center'>
                    <form>
                        <p className="text-dark text-bold text-regular">Squat</p>
                        <Input register={register} errors={errors}
                            name='squat' 
                            type='text' 
                            placeholder='Enter Max'
                            validation={{required: 'Enter your squat max'}}
                        />
                        <p className="text-dark text-bold text-regular">Bench</p>
                        <Input register={register} errors={errors}
                            name='bench' 
                            type='text' 
                            placeholder='Enter Max'
                            validation={{required: 'Enter your bench max'}}
                        />                    
                        <p className="text-dark text-bold text-regular">Deadlift</p>
                        <Input register={register} errors={errors}
                            name='deadlift' 
                            type='text' 
                            placeholder='Enter Max'
                            validation={{required: 'Enter your deadlift max'}}
                        />                    
                        <p className="text-dark text-bold text-regular">Press</p>
                        <Input register={register} errors={errors}
                            name='press' 
                            type='text' 
                            placeholder='Enter Max'
                            validation={{required: 'Please enter your press max'}}
                        />                
                    </form>
                    <div className="buttons container-flex container-vertical container-vetical-center">
                        <button onClick={handleSubmit(onSubmit)}className="btn btn-primary btn-regular my-1">
                            submit
                        </button>
                        <button onClick={() => handleBack()} className="btn btn-dark btn-regular">
                            back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
FormStep2.propTypes = {
    createCycle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, { createCycle })(FormStep2);