/**
 * author: jichuangwei
 * email: 2323176669@qq.com
 * Switch component for React
 *
 * Switch parameters:
 * condition {String} is condition for choice children component
 *
 * Case parameters:
 * value {String} is anchor for Switch
 * */
import React, { Component, Children } from 'react'
const Case = ({children, style, className}) => (
    <span style={style} className={className}>{children}</span>
)
const Default = ({children, style, className}) => (
    <span style={style} className={className}>{children}</span>
)
class Switch extends Component {
    static Case = Case;
    render() {
        const {value, style, className, children} = this.props
        let case_item = null
        let flag = false
        let default_item = []
        Children.forEach(children, (item) => {
            if (item.type === Case) {
                const props = item.props
                const itemValue = props.value
                const _m = typeof itemValue === 'function' ? itemValue(value) : itemValue === value
                if (_m && value !== undefined && itemValue !== undefined) {
                    flag = true
                    case_item = item
                }
            } 
            if(item.type === Default){
                default_item.push(item)
            }
        })
        return (
            <span style={style} className={className}>
                {flag ? case_item : default_item}
            </span>
        )
    }
}
export { Case };
export { Default };
export default Switch