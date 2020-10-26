import React, {Component} from 'react';
import './App.css';
import Products from "./products/products";
import Select from './components/select/select'
import Input from './components/input/input'

export default class App extends Component{

  state = {
    Products: Products,
    SelectedProductID : 0,
    CurrentTerm: 0,
    CurrentProductPrice: 0,
    FirstPayPERC: 0,
    FirstPayRUB: 0,
    DepositAmount: 0,
    OtherProductsAmount: 0,
    EquipmentAmount: 0,
    TotalAmount: 0,
    AnotherPercents: 0,
    MonthlyAmount: 0,
    Status: false
  }

  onHandleSelect = (e) => {
    this.setState({SelectedProductID: e.target.selectedIndex, Status: 0, CurrentTerm: 0})
    this.calculateTotalAmount()
    this.checkPercents()
  }

  termHandleSelect = (e) => {
    this.setState({CurrentTerm: Number(e.target.value), Status: 0})
  }

  inputHandleChange = (e) => {
    const {name,value} = e.target
    this.setState({[name]: Number(value), Status: 0},()=>{
      this.calculateTotalAmount()
      this.checkPercents()
    })

  }

  percentToRub = () => {
    const {CurrentProductPrice, FirstPayPERC} = this.state
    const result = ((CurrentProductPrice/100)*FirstPayPERC).toFixed(2)
    this.setState({FirstPayRUB: Number(result)})
    alert(`${result} ₽`)
  }

  calculateTotalAmount = () => {
    const {
      CurrentProductPrice,
      FirstPayPERC,
      DepositAmount,
      OtherProductsAmount,
      EquipmentAmount
    } = this.state
    const result = CurrentProductPrice - (CurrentProductPrice/100)*FirstPayPERC + DepositAmount + OtherProductsAmount + EquipmentAmount
    this.setState({TotalAmount: Number(result.toFixed(2))})
  }

  runChecks = () => {
    this.checkPercents()
    this.calculateAnnuity()
    this.checkConditions()
  }

  checkPercents = () => {
    const {Products, SelectedProductID, CurrentTerm, FirstPayPERC} = this.state
    const CurrentProduct = Products[SelectedProductID]
    let AnotherPercents = 0

    switch (CurrentProduct.Title) {
      case 'Новые автомобили' :
        if (37 <= CurrentTerm && CurrentTerm <= 72) {
            AnotherPercents += 2
          }
        if (0 <= FirstPayPERC && FirstPayPERC <= 19 ) {
          AnotherPercents += 4
        }
        if (20 <= FirstPayPERC && FirstPayPERC <= 50 ) {
          AnotherPercents += 5
        }
        break
      case 'Б/у автомобили' :
        if (37 <= CurrentTerm && CurrentTerm <= 72) {
          AnotherPercents += 4
        }
        if (0 <= FirstPayPERC && FirstPayPERC <= 19 ) {
          AnotherPercents += 5
        }
        if (20 <= FirstPayPERC && FirstPayPERC <= 50 ) {
          AnotherPercents += 7
        }
        break
      default:
        break
    }
    this.setState({AnotherPercents})
  }

  checkConditions = () => {
    const {Products, SelectedProductID, CurrentTerm, TotalAmount} = this.state
    const CurrentProduct = Products[SelectedProductID]


    if (
      CurrentTerm >= CurrentProduct.minTerm &&
      CurrentTerm <= CurrentProduct.maxTerm &&
      TotalAmount >= CurrentProduct.minAmount &&
      TotalAmount <= CurrentProduct.maxAmount
    ){
      this.setState({Status: 2})
    } else {
      this.setState({Status: 1})
    }
  }

  calculateAnnuity = () => {
      const {TotalAmount, CurrentTerm, SelectedProductID, Products, AnotherPercents} = this.state
      const i = ((Products[SelectedProductID].DefaultPercent + AnotherPercents) / 12) / 100
      const k = (i * (Math.pow(1 + i, CurrentTerm))) / (Math.pow(1 + i, CurrentTerm) - 1);
      const p = (TotalAmount * k).toFixed(2)
      this.setState({MonthlyAmount: p})
  }

  render() {

    const {
      SelectedProductID,
      Products,
      CurrentTerm,
      CurrentProductPrice,
      FirstPayPERC,
      DepositAmount,
      OtherProductsAmount,
      EquipmentAmount,
      TotalAmount,
      MonthlyAmount
    } = this.state

    return (
      <div className="App">
        <div className="jcc">
          <Select onHandleSelect = {this.onHandleSelect} content = {Products} type="Products" label={'Кредитная программа:'} SelectedProductID = {SelectedProductID}/>

          {
            (SelectedProductID===4) ?
            <Select onHandleSelect={this.termHandleSelect} content = {Products[4].Term} type="Term" label={'Срок рассрочки (мес)'} /> :
            <Input inputHandleChange = {this.inputHandleChange} label={'Срок кредита (мес)'} value={CurrentTerm} name={"CurrentTerm"} />
          }

          <Input inputHandleChange = {this.inputHandleChange} label={'Стоимость товара'} name={"CurrentProductPrice"} value={CurrentProductPrice} />
          <Input inputHandleChange = {this.inputHandleChange} label={'Первоначальный взнос (процентов)'} action ={this.percentToRub} name={"FirstPayPERC"} value={FirstPayPERC}/>
          <Input inputHandleChange = {this.inputHandleChange} label={'Сумма страхования  залога'} name={"DepositAmount"} value={DepositAmount} />
          <Input inputHandleChange = {this.inputHandleChange} label={'Сумма дополнительных продуктов'} name={"OtherProductsAmount"} value={OtherProductsAmount} />
          <Input inputHandleChange = {this.inputHandleChange} label={'Сумма дополнительного оборудования'} name={"EquipmentAmount"} value={EquipmentAmount} />
          <Input label={'Сумма кредита'} disabled={true} value={TotalAmount} />
          <button onClick={this.runChecks}>Рассчитать</button>

          {(this.state.Status === 2)?(
              <React.Fragment>
                <br/>
                <label>Рассчёты являются предварительными</label>
                <br/>
                <label>Процентная ставка {Products[SelectedProductID].DefaultPercent + this.state.AnotherPercents}</label>
                <br/>
                <label>Ежемесячный платеж: {MonthlyAmount}</label>
              </React.Fragment>)
            :
             (this.state.Status === 1)?(
               <React.Fragment>
                 <br/>
                 <span>Условия не подходят</span>
               </React.Fragment>
             ): null
          }
        </div>
      </div>
    );
  }

}