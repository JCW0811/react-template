/**
 * author: jichuangwei
 * email: 2323176669@qq.com
 * */
import React from 'react'
import './form.less';
import * as api from '../../config/api'
import Switch,{Case,Default} from '../switch.jsx'
import { Form, Input, Button ,DatePicker,Select } from 'antd';
const Option = Select.Option;
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
                                     {getFieldDecorator(controlsItem.controlNameAttr, {
                                       validateTrigger: ['onChange', 'onBlur'],
                                        rules: [
                                        { required: controlsItem.required,message: `请输入${controlsItem.controlName}` }
                                        ],
                                     })(         
                                       <Input placeholder={controlsItem.controlNameAttr} />
                                     )}
                              </Case>
                              <Case value='date'>
                                 <DatePicker/>
                              </Case>
                              <Case value='select'>
                                  <Select defaultValue="lucy">
                                    <Option value="ID">身份证</Option>
                                  </Select>
                               </Case>
                              <Case value='button'>
                               <Button type="primary" htmlType={controlsItem.controlNameAttr==='submit'?'submit':'button'} >{controlsItem.controlName}</Button>
                              </Case>
                              <Default>default case</Default>
                           </Switch>
                       </FormItem>

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

export default Form.create()(FormTemplate)