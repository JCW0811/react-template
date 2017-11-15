import React from 'react'
import './index.less';
import * as api from '../../config/api'
import Switch from '../switch.jsx'
import { Form, Input, Button } from 'antd';
import { DatePicker } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;
const Case = Switch.Case
const FormItem = Form.Item;
class FormTemplate extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      saveData:[],
      data:[]
    }
  }
  componentWillMount() {
    api.getData().then((data)=>{
      this.setState({
        data:data.data
      })
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          saveData:this.state.saveData.concat(values)
        })
        this.setState({
          page: 2
        })
      } else {
        console.log(err)
      }
    });
  }
  next = (page) => {
    this.setState({
      page
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const formList = this.state.data.map((formItem,formIndex)=>{
      return(
             <Form key={formIndex} onSubmit={this.handleSubmit}>
                 {formItem.controls.map((controlsItem,controlsIndex)=>{
                  return(
                    <div key={controlsIndex}>

                        <FormItem
                          {...formItemLayout}
                          label={controlsItem.controlType!=='button'?controlsItem.controlName:null}
                          required={controlsItem.required}
                          
                           >
                           <Switch value={controlsItem.controlType}>
                               <Case value='text'>
                                      {getFieldDecorator(`controls-${controlsIndex}`, {
                                        validateTrigger: ['onChange', 'onBlur'],
                                        rules: [{ 
                                         required: true,
                                         message: 'This is required!' }],
                                      })(         
                                        <Input placeholder="placeholder" />
                                      )}
                               </Case>
                              <Case value='date'>
                                 <DatePicker/>
                              </Case>
                               <Case value='select'>
                                  <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
                                    <Option value="lucy">身份证</Option>
                                  </Select>
                              </Case>
                              <Case value='button'>
                                <Button type="primary" htmlType="submit" >{controlsItem.controlName}</Button>
                              </Case>

                              <span>default case</span>
                           </Switch>


                       </FormItem>

                       {/*<FormItem {...formItemLayoutWithOutLabel}>
                               <Button type="primary" htmlType="submit" >test</Button>
                          </FormItem>*/}

                    </div>
                    )
                 })}
             </Form>
        )
    })


    return (
      <div className='form-demo'>
        {formList}
      </div>
    );
  }
}

const App = Form.create()(FormTemplate);
export default App