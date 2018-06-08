<?php
ini_set('display_errors', 1);
$server = "127.0.0.1:3306";
$db_name = "clanguage";
$db_user = "root";
$db_pwd = "root";
$title = "简明教程";
$info = "包括近300个常用函数，每一个函数都依次以函数原型、功能、参数、返回值、范例、注意事项等形式分开讲解，供读者参考学习。";
//设置http报头
header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json');
header("Content-Disposition:;filename='mydata.json'");

//全局变量msg存储查询结果状态
$msg ;
//打开数据库
function openDatabase()
{
    global $server, $db_name, $db_user, $db_pwd,$msg;
    $conn = mysqli_connect($server, $db_user, $db_pwd);
    if (!$conn) {
        $msg = "数据库链接异常";
    }
    mysqli_select_db($conn, $db_name);
    return $conn;
}
//按照类目查询
function getFunType()
{
    $conn = openDatabase();
    $result = mysqli_query($conn, "SELECT sort,id,name  FROM intellectual ORDER By ID");
    $data = new StdClass();
    while ($row = $result->fetch_assoc()) {
        $type = $row["sort"];
        if (!property_exists($data, $type)) {
            $data->$type = [];
        }
        array_push($data->$type, ["name" => $row["name"], "id" => $row["id"]]);
    }
    return $data;
}
//按照ID查询详细
function getById($id){
    global $msg;
    $conn = openDatabase();
    $result = mysqli_query($conn,"SELECT * FROM intellectual WHERE ID = {$id}");
    $data = $result->fetch_assoc();
    if ($data == NULL){
        $msg = "ID:{$id}对应的记录不存在";
    }
    return $data;
}
//查询算法
function getAllArithmetic($cat){
    global $msg;
    $conn = openDatabase();
    $result = mysqli_query($conn, "SELECT sort,ID,name  FROM intellectual WHERE sort like '%{$cat}%'");
    $data = new StdClass();
    while ($row = $result->fetch_assoc()) {
        $type = $row["sort"];
        if (!property_exists($data, $type)) {
            $data->$type = [];
        }
        array_push($data->$type, ["name" => $row["name"], "id" => $row["id"], "content" => $row["content"]]);
    }
    $data && $msg = '查询成功';
    return $data;
}

if (isset( $_GET["cat"])&& $_GET["cat"] == "all"){
    $data = getFunType();
}
if (isset( $_GET["arithmetic"])){
    $data = getAllArithmetic($_GET["arithmetic"]);
}
if (isset( $_GET["id"])){
    $data = getById($_GET{"id"});
}
$msg || $msg = "查询成功";
//将查询结果组合输出
$data_json = new stdClass();
$data_json -> data = $data;
$data_json -> title = $title;
$data_json -> info = $info;
$data_json -> msg = $msg;
$data_json = json_encode($data_json);

echo $data_json;