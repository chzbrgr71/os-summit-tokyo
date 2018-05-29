<template>
    <div>
        <Row>
            <Col span="12">col-12</Col>
            <Col span="12">col-12</Col>
        </Row>
        <br>
        <Row>
            <Col span="8">col-8</Col>
            <Col span="8">col-8</Col>
            <Col span="8">col-8</Col>
        </Row>
        <br>
        <Row>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
            <Col span="6">col-6</Col>
        </Row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  }
};
</script>
