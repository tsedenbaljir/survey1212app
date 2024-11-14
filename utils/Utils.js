import { StyleSheet } from 'react-native';
import LOGO from '../assets/logo1.png'
import food from '../assets/food.jpg'
import dinner from '../assets/dinner.png'

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  }
});
const Utils = {
  // BASE_URL: "http://srv.nso.mn/surveyservice/webservice.svc"
  // BASE_URL: "http://sdg.gov.mn/surveyservice/webservice.svc",
  // BASE_URL: "http://66.181.167.87/surveyservice/webservice.svc",
  // BASE_URL: "http://202.131.245.67/api/v1",
  BASE_URL: "https://survey1212.nso.mn/api",
  LOGO: LOGO,
  food: food,
  dinner: dinner,
  DAYS: [
    { id: 1, name: "Даваа" },
    { id: 2, name: "Мягмар" },
    { id: 3, name: "Лхагва" },
    { id: 4, name: "Пүрэв" },
    { id: 5, name: "Баасан" },
    { id: 6, name: "Бямба" },
    { id: 7, name: "Ням" },
  ],
  SLIDES: [
    {
      key: 'k1',
      title: 'Цаг ашиглалтын судалгаа',
      text: 'Судалгааны үр дүнгээр Монгол Улсын өрх, хүн амын аж байдал, 12 ба түүнээс дээш насны хүн амын эрхэлж буй үйл ажиллагаа болон түүнд зарцуулж байгаа дундаж хугацаа зэрэг үзүүлэлтийг тооцно.',
      image: require('../assets/pic1.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#0bbdac',
      
    },
    {
      key: 'k2',
      title: 'Судалгаанд хэн оролцох вэ?',
      text: 'Өдрийн тэмдэглэлийг өрхийн 12 ба түүнээс дээш насны судалгааны  хугацаанд гэртээ байгаа судалгаанд хамрагдах боломжтой өрхийн гишүүдээр хөтлүүлнэ. ',
      image: require('../assets/pic3.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#febe29',
    
    },
    {
      key: 'k3',
      title: 'Судалгаа хэд хоног үргэлжлэх вэ?',
      text: 'Өдрийн тэмдэглэлийг судалгаанд оролцогч 2-3 хоногийн турш хөтлөх бөгөөд өглөөний 04 цагаас эхэлж 24 цагийг хамарна.',
      image: require('../assets/pic4.png'),
      titleStyle: styles.title,
      textStyle: styles.text,
      imageStyle: styles.image,
      backgroundColor: '#FF1744',
    }
  ]
}

export default Utils