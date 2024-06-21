import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft';

const { width, height } = Dimensions.get('window')

export default class UserManualScreen1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      idx: 0
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;

    navigation.setOptions({
      headerTitle: 'Заавар',
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexWrap: "nowrap", flexDirection: "row" }}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} style={{ color: "#0070aa", fontWeight: "bold" }} />
          <Text style={{ color: "#0070aa", fontWeight: "bold" }}>Буцах</Text>
        </TouchableOpacity>
      ),
    });
  }
  render() {
    const Slider = (props) => {
      return (
        <View style={{ backgroundColor: props.backgroundColor, flex: 1, width: width }}>
          <Text style={styles.title}>{props.title}</Text>
          {
            props.image && <Image source={props.image} style={{ width: width / 2, height: width / 2, alignSelf: "center" }} resizeMode="contain" />
          }
          {props.children}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", padding: 10 }}>
            <Text>{props.idx + 1}/{slides.length}</Text>
          </View>
        </View>
      )
    }
    return (
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false} 
          scrollEventThrottle={16} 
          onScroll={(e) => {
            // const idx = (e.nativeEvent.contentOffset.x / width).toFixed();
          }}
        >
          {
            slides.map((v,i) => {
              return (
                <Slider key={i} idx={i} backgroundColor={v.backgroundColor}  title={v.title} image={v.image}>{v.text}</Slider>
              )
            })
          }
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'justify',
    padding: 10,
    fontSize: 18
  },  
  title: {
    fontSize: 20,
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    padding: 20,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    title: 'Өрхийн нийгэм, эдийн засгийн судалгаа 2021',
    text: <Text style={styles.text}>Өрхийн нийгэм, эдийн засгийн судалгаа нь өрхөд суурилсан нийгэм, эдийн засгийн мэдээллийг түшиглэн Монгол Улсын хүн амын амьжиргааны байдал, ядуурал, өрхийн орлого, зарлага, хэрэглээ болон бусад хүн амын амьжиргааны үзүүлэлтийг тодорхойлох үндсэн зорилготой.</Text>,
    image: require('../assets/hh1.png'),
    backgroundColor: '#f9cc91',
  },
  {
    title: 'Өдрийн тэмдэглэлийн ач холбогдол',
    text: <Text style={styles.text}>Энэхүү өдрийн тэмдэглэл нь танай өрхийн бүх гишүүдийн тухайн өдөр идсэн зүйлсийг бүгдийг бүртгэх зорилготой юм. Уг мэдээллийг нарийвчлан цуглуулснаар манай улсын нэг хүний нэг өдөрт хэрэглэж буй шим тэжээлийн (илчлэг, уураг, өөх, тос гэх мэт) найрлагыг тодорхойлох боломж бүрдэхээс гадна хүнсний хэрэглээ, зардлын мэдээллийг мөн мэдэх ач тустай юм.</Text>,
    image: require('../assets/hh1.png'),
    backgroundColor: '#fcdc91',
  },
  {
    title: 'Өдрийн тэмдэглэлийг хэн нөхөх вэ?',
    text: <Text style={styles.text}>Өдрийн тэмдэглэлийг өрхийн хоол хүнсний зүйл бэлтгэх болон худалдан авах зэрэг өрхийн хүнсний хэрэглээний талаарх сайн мэддэг өрхийн гишүүн нөхнө.</Text>,
    image: require('../assets/pic3.png'),
    backgroundColor: '#febe29',
  },
  {
    title: 'Судалгаа хэд хоног үргэлжлэх вэ?',
    text: <Text style={styles.text}>Өрхийн гишүүд гэртээ өөрсдөө бэлтгэж хэрэглэсэн болон өрхөөс гадуур хэрэглэсэн хүнсний хэрэглээг 7 хоногийн турш хөтөлнө.</Text>,
    image: require('../assets/week.png'),
    backgroundColor: 'rgba(224,49,41,0.5)',
  },
  {
    title: 'I. Өрхийн хүнсний хэрэглээг бүртгэхэд анхаарах зүйлс',
    text: <View style={{ padding: 10 }}>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        <Text style={{ fontWeight: "bold" }}>•	Хүнсний нэр төрлийг бичих. </Text>
        Өрхийн гишүүдийн хэрэглэсэн хүнсний зүйлийн нэрийг нэг бүрчлэн дэлгэрэнгүй бүртгэнэ. 
        Бүртгэхдээ хүнсний зүйлийн нэрийг хэт ерөнхий бичихээс зайлсхийх. 
        Жишээлбэл: <Text style={{ fontWeight: "bold" }}>махыг</Text> бичихээр бол хонины мах, үхрийн мах, <Text style={{ fontWeight: "bold" }}>будааг</Text> шар будаа, цагаан будаа, <Text style={{ fontWeight: "bold" }}>гурилыг</Text> 1-р гурил, 2-р гурил гэх мэт нэр төрөл бүрээр дэлгэрэнгүй бичнэ.      
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        <Text style={{ fontWeight: "bold" }}>•	Хэмжих нэгж сонгох. </Text>
        Хүнсний зүйлийн хэмжих нэгжийг кг, гр, ш, л, хайрцаг гэсэн хэмжээсүүдээс тохирохыг сонгоно. “Хайрцаг” гэсэн хэмжээс зөвхөн ЯНЖУУР ТАМХИ-ны хувьд, “ЛИТР” нь зөвхөн шингэн зүйлсийн хувьд гэх зэргээр тохирох хэмжээсийг сонгоно. Жишээлбэл: 0.5 кг мах, 2 ш талх, 1 хайрцаг янжуур гэх мэт.
      </Text>
    </View>
    ,
    image: require('../assets/ww.png'),
    backgroundColor: '#4fb4be',
  },
  {
    title: 'I.	Өрхийн хүнсний хэрэглээг бүртгэхэд анхаарах зүйлс',
    text: <View style={{ padding: 10 }}>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        <Text style={{ fontWeight: "bold" }}>•	Тоо хэмжээ бичих. </Text>
        Тухайн хүнсний зүйлийн сонгосон хэмжээст тохируулан хэрэглэсэн тоо хэмжээг нөхнө. 
        Жишээлбэл: 100 гр элсэн чихэр хэрэглэсэн гэвэл Хэрэглэсэн зүйлийн нэр: <Text style={{ fontWeight: "bold" }}>Элсэн чихэр</Text>, Хэмжих нэгж: <Text style={{ fontWeight: "bold" }}>кг</Text>, Хэрэглэсэн тоо хэмжээ: <Text style={{ fontWeight: "bold" }}>0.1</Text> гэх нөхнө.
      </Text>
      <View>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        <Text style={{ fontWeight: "bold" }}>•	Эх үүсвэрийг сонгох. </Text>
        Хэрэглэсэн хүнсний зүйлээ худалдан авч хэрэглэсэн, бусдаас үнэгүй авсан, өөрийн аж ахуйгаас хэрэглэсэн гэсэн 3 эх үүсвэрээс тодорхойлно. 
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Худалдан авсан гэдэгт </Text>өрхийн гишүүд өөрсдөө мөнгө төлж авсан зүйлийг ойлгоно. 
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Бусдаас үнэгүй авсан гэдэгт </Text>өрхийн гишүүн биш хүнээс авч хэрэглэсэн зүйлсийг ойлгоно. Жишээлбэл, хамаатны хүн нь үнэгүй мах өгсөн ба түүнээсээ идсэн бол энэ эх үүсвэрийг сонгоно. 
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Өөрийн аж ахуйгаас гэдэгт </Text>өөрсдийн тарьсан ногоогоо идсэн, өөрийн малын махаа идсэн гэх мэт өөрийн аж ахуйд бэлтгэсэн зүйлсийг авч хэрэглэсэн бол энэ эх үүсвэрийг сонгоно. 
      </Text>
      </View>
    </View>
    ,
    image: null,
    backgroundColor: '#4fb4be',
  },
  {
    title: 'I.	Өрхийн хүнсний хэрэглээг бүртгэхэд анхаарах зүйлс',
    text: <View style={{ padding: 10 }}>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        <Text style={{ fontWeight: "bold" }}>•	Нэгжийн үнийг бичих. </Text>
        Хэрэв тухайн хүнсийг өрхийн гишүүд худалдан авч хэрэглэсэн бол нэгжийн үнийг бичнэ. Харин бусад хоёр эх үүсвэрийг сонгосон бол нэгжийн үнэ нөхөгдөхгүй. 
        Жишээлбэл: 1 кг нь 1200 төгрөгийн үнэтэй төмсийг нийт 2 кг-ийг 2400 төгрөгөөр ХУДАЛДАЖ АВСАН гэвэл нэгжийн үнэ 1200 төгрөг гэж бичнэ.
      </Text>
      <View>
        <Text style={{ textAlign: "justify", fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>•	Нэг хүнсний нэр төрөл бүртгэх жишээ. </Text>
          Өрх 1 кг нь 2000 төгрөгийн үнэтэй элсэн чихрээс 500 граммыг худалдан аваад тухайн өдөр 100 гр-ийг идсэн гэвэл өрхийн хэрэглээнд нөхөхдөө дараах 2 аргаар бүртгэнэ:
        </Text>
        <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
          <Text style={{ fontWeight: "bold" }}>1.	Хэрэглэсэн зүйлийн нэр: </Text>
          <Text style={{ fontWeight: "bold" }}>Элсэн чихэр</Text>, Хэмжих нэгж: <Text style={{ fontWeight: "bold" }}>кг</Text>, Хэрэглэсэн тоо хэмжээ: <Text style={{ fontWeight: "bold" }}>0.1</Text>, Эх үүсвэр: <Text style={{ fontWeight: "bold" }}>Худалдан авсан</Text>, Нэгжийн үнэ: <Text style={{ fontWeight: "bold" }}>2000 төгрөг</Text>.
        </Text>
        <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
          <Text style={{ fontWeight: "bold" }}>2.	Хэрэглэсэн зүйлийн нэр: </Text>
          <Text style={{ fontWeight: "bold" }}>Элсэн чихэр</Text>, Хэмжих нэгж: <Text style={{ fontWeight: "bold" }}>гр</Text>, Хэрэглэсэн тоо хэмжээ: <Text style={{ fontWeight: "bold" }}>100</Text>, Эх үүсвэр: <Text style={{ fontWeight: "bold" }}>Худалдан авсан</Text>, Нэгжийн үнэ: <Text style={{ fontWeight: "bold" }}>2 төгрөг</Text>.
        </Text>
      </View>
    </View>
    ,
    image: null,
    backgroundColor: '#4fb4be',
  },
  {
    title: 'II. Гадуур хооллолт бүртгэхэд анхаарах зүйлс',
    text: <View style={{ padding: 10 }}>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        <Text style={{ fontWeight: "bold" }}>•	Зочны тоог бүртгэх. Энэ өдөр хоносон зочны тоо гэдэгт </Text>
        Тухайн өдөр өрхөд БҮТЭН ХОНОСОН өрхийн гишүүн биш хүний тоог бүртгэнэ. Уг зочны/зочдын хэрэглэсэн хүнсний хэрэглээг “ӨРХИЙН ХҮНСНИЙ ХЭРЭГЛЭЭ” бүлэгт нэмж бүртгэнэ. 
        Хэрэв өрхөд ирсэн зочин хоноогүй бол зочныг хооллосон хүнсний зардлыг “ӨРХИЙН ХҮНСНИЙ ХЭРЭГЛЭЭ” бүлэгт бүртгэхгүй
      </Text>
    </View>
    ,
    image: null,
    backgroundColor: '#4fb4be',
  },
  {
    title: 'II. Гадуур хооллолт бүртгэхэд анхаарах зүйлс',
    text: <View style={{ padding: 10 }}>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        •	Өрхийн гишүүдийн <Text style={{ fontWeight: "bold" }}>гэрээсээ гадуур</Text> албан газар, сургууль, ресторан, кафе, зоогийн газар, цайны газар болон дэлгүүрээс өрхийн гишүүд өөрсдөө мөнгөө төлсөн, 
        худалдаж авсан эсвэл өрхийн гишүүн биш хэн нэгнээр төлүүлсэн (даалгасан, бэлгэнд авсан гэх мэт) хүнсний хэрэглээнүүд болох 
        <Text style={{ fontWeight: "bold" }}> өглөөний цай, өдөр, оройн хоол, зууш, ус, ундаа, кофе, цай, архи согтууруулах ундаа, гэрээсээ өөр газар бэлтгэсэн бэлэн хоол, хүнсийг гэртээ авчирч идсэн</Text> зэрэг хэрэглээг салгаж бүртгэнэ.
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Гадуур хооллосон нийт тоо </Text>
        гэдэг нь өрхийн гишүүдийн гадуур хоол идсэн удаагийн нийлбэр байна. Жишээлбэл, Өрхийн 1 гишүүн 2 удаа хооллосон бол 2 гэж авна, 2 гишүүн нэг нэг удаа хооллосон бол  мөн 2 гэж авна.
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Өрхийн гишүүдээс гарсан нийт зардал </Text>
        гэдэг нь өрхийн гишүүдийн өөрсдөө мөнгөө төлж, худалдаж авсан нийт зардлыг төгрөгөөр нөхнө.
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Бусдаас үнэгүй авсан нийт үнийн дүн </Text>
        гэдэг нь өрхийн гишүүн биш хэн нэгнээр төлүүлсэн (даалгасан, бэлгэнд авсан гэх мэт) нийт зардлыг төгрөгөөр илэрхийлж нөхнө.
      </Text>
    </View>
    ,
    image: null,
    backgroundColor: '#4fb4be',
  },
  {
    title: 'II. Гадуур хооллолт бүртгэхэд анхаарах зүйлс',
    text: <View style={{ padding: 10 }}>
      <Text style={{ textAlign: "justify", fontSize: 16 }}>
        <Text style={{ fontWeight: "bold" }}>•	Гадуур хооллолт бүртгэх жишээ </Text>
        Жишээлбэл, өрх 5 ам бүлтэй, тэгвэл өрхийн 1  гишүүн нь өдрийн хоолоо 10000 төгрөгөөр худалдан авч идсэн, харин нөгөө 1 нь найзаараа 7000 төгрөгийн хоол худалдан авахуулж идсэн, үлдсэн хүмүүс нь 20000 төгрөгөөр пицца захиалж гэртээ идсэн гэвэл
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Өдрийн хоол хэсэгт </Text>
        гадуур хооллосон тоо: 2, өрхийн гишүүдийн гаргасан зардал: 10000, бусдаас үнэгүй авсан нийт үнийн дүн: 7000 
      </Text>
      <Text style={{ textAlign: "justify", fontSize: 16, marginLeft: 30 }}>
        <Text style={{ fontWeight: "bold" }}>•	Бэлэн хоол хүнс хэсэгт </Text>
        гадуур хооллосон тоо: 3, өрхийн гишүүдийн гаргасан зардал 20000, Бусдаас үнэгүй авсан нийт үнийн дүн: 0 гэж бүртгэнэ.
      </Text>
    </View>
    ,
    image: null,
    backgroundColor: '#4fb4be',
  },
  {
    title: 'Өдрийн тэмдэглэлийг жишээгээр үзүүлье. Алхам 1:',
    text: <Text style={styles.text}>Та судалгаа цэс рүү орон өдрийн тэмдэглэлээ хөтөлнө</Text>,
    image: require('../assets/sr1.png'),
    backgroundColor: '#64CC94',
  },
  {
    title: 'Алхам 2:',
    text: <Text style={styles.text}>Өрхийн нийгэм, эдийн засгийн судалгааны өдрийн тэмдэглэл цэсийг сонгоно.</Text>,
    image: require('../assets/sr2.png'),
    backgroundColor: '#64CC94',
  },
  {
    title: 'Алхам 3:',
    text: <Text style={styles.text}>Өрхийн хүнсний хэрэглээ болон өрхөөс гадуур хэрэглэсэн хүнсний зүйлсээ тэмдэглэх цэсээ сонгон орж өдрийн тэмдэглэлээ хөтөлнө.</Text>,
    image: require('../assets/sr3.png'),
    backgroundColor: '#64CC94',
  },
  {
    title: 'Алхам 4:',
    text: <Text style={styles.text}>"Өрхийн хүнсний хэрэглээ" цэс рүү ороход таны тэмдэглэсэн хүнсний жагсаалт харагдах ба тухайн өдөр тэмдэглэл хөтлөөгүй бол хоосон харагдана. Хэрвээ та 7 хоногийн аль нэг өдөр дээр хүнсний хэрэглээ нэмэх бол тухайн өдрөө сонгон "Хүнсний хэрэглээ нэмэх" товчийг даран нэмэх боломжтой.</Text>,
    image: require('../assets/sr4.png'),
    backgroundColor: '#64CC94',
  },
  {
    title: 'Алхам 5:',
    text: <Text style={styles.text}>Таны оруулсан мэдээлэл алдаатай бол танд судлаачаас мэдэгдэл ирнэ. Хэрвээ танд мэдэгдэл ирсэн бол таны оруулсан хүнсний жагсаалтын ард захианы зураг гарч ирнэ. Тухайн зурган дээр дарснаар мэдэгдлийг унших боломжтой.</Text>,
    image: require('../assets/sr7.png'),
    backgroundColor: '#64CC94',
  },
  {
    title: 'Алхам 6:',
    text: <Text style={styles.text}>Оруулсан хүнсний хэрэглээг засах, устгах боломжтой. Та хүнсний хэрэглээний жагсаалтаас өөрийн засах хүнсний хэрэглээ дээр даран орсноор энэ үйлдлийг хийх боломжтой.</Text>,
    image: require('../assets/sr6.png'),
    backgroundColor: '#64CC94',
  },
  {
    title: 'Алхам 7:',
    text: <Text style={styles.text}>"Гэрээс гадуур хэрэглэсэн өрхийн хүнсний хэрэглээ, зочны тоо" цэс рүү орон өрхийн гадуур хэрэглэсэн хүнс болон зочны тоог оруулна. Жишээ нь тухайн өдөр өрхийн аль нэг гишүүн өглөөний цай гадуур идсэн бол "тийм" гэж сонгоно. Хэрвээ гадуур идээгүй бол "үгүй" гэж сонгон дараагийн асуулт руу шилжинэ.</Text>,
    image: require('../assets/sr8.jpg'),
    backgroundColor: '#64CC94',
  },
  {
    title: 'Өдрийн тэмдэглэл дуусгах',
    text: <Text style={styles.text}>Та 7 хоногийн өрхийн хүнсний хэрэглээ болон өрхөөс гадуур хэрэглэсэн хүнсний хэрэглээг оруулж дууссан бол "ДУУСГАХ" товчийг дарснаар таны өдрийн тэмдэглэл амжилттай баталгаажих юм. "ДУУСГАХ" товч дарсны дараа дахин мэдээлэл засварлах боломжгүй болохыг анхаарна уу!</Text>,
    image: require('../assets/done.png'),
    backgroundColor: '#64CC94',
  },
];