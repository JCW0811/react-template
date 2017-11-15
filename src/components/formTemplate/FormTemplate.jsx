/**
 * author: jichuangwei
 * email: 2323176669@qq.com
 * */
import React from 'react'
import './form.less';
import * as api from '../../config/api'
import { Form, Input, Button ,DatePicker,Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
let url = '';
let saveData = {};
class FormTemplate extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      data:[]
    }
  }
  componentWillMount() {
    api.getData().then((data) => {
      this.setState({
        data: data.data
      })
    })
  }
  submit() {
    console.log(url,saveData)
    api.submitForm(url,saveData).then((data) => {
      console.log(data)
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        saveData = Object.assign(saveData,values);
        if (this.state.page === this.state.data.length - 1) {
          this.submit();
          return;
        }
        this.setState({
          page: this.state.page + 1
        })
      } else {
        // console.log(err)
      }
    });
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
    const formList = this.state.data.map((formItem,formIndex)=>{
      return(
        <div key={formIndex} >
         {this.state.page === formIndex?
             <Form onSubmit={this.handleSubmit}>
                 {formItem.controls.map((controlsItem,controlsIndex)=>{
                  if(controlsItem.controlNameAttr === 'submit'){url=controlsItem.controlEvent}
                  let returnItem;
                  switch (controlsItem.controlType) {
                    case 'text':
                      returnItem =
                        <FormItem {...formItemLayout} label={controlsItem.controlName}>
                                  {getFieldDecorator(controlsItem.controlNameAttr, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                     rules: [
                                     { required: controlsItem.required,message: `请输入${controlsItem.controlName}` },
                                     {max:5,message:'超过长度'}
                                     ],
                                  })(         
                                    <Input placeholder={controlsItem.controlNameAttr} />
                                  )}
                        </FormItem>;
                      break;
                    case 'date':
                      returnItem =
                        <FormItem {...formItemLayout} label={controlsItem.controlName}>
                               {getFieldDecorator(controlsItem.controlNameAttr,{
                                 rules: [
                                 { required: controlsItem.required, message: `请选择${controlsItem.controlName}` }]})(
                                 <DatePicker />
                               )}
                        </FormItem>
                      break;
                    case 'select':
      
                      returnItem = 
                      <FormItem {...formItemLayout} label={controlsItem.controlName}>
                             {getFieldDecorator(controlsItem.controlNameAttr, {
                                 rules: [{ required: controlsItem.required, message: `请选择${controlsItem.controlName}` }],
                               })(
                            <Select>
                              <Option value="ID">身份证</Option>
                            </Select>
                             )}
                      </FormItem>
      
                      break;
                    case 'button':
                      returnItem =
                        <FormItem {...formItemLayout}>
                            <Button type="primary" 
                            htmlType={controlsItem.controlNameAttr==='next'||controlsItem.controlNameAttr==='submit'?'submit':'button'} 
                            >{controlsItem.controlName}
                            </Button>
                        </FormItem>
      
                      break;
                    default:
                      break;
                  }
                  return(
                    <div key={controlsIndex}>
                        {returnItem}
                    </div>
                    )
                 })}
             </Form>
             :null}
          </div>
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