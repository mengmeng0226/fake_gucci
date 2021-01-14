<?php


  $one = $_GET['cat_one'];
  $two = $_GET['cat_two'];

  // 2. 组装 sql 语句
  $sql = "SELECT `cat_three_id` FROM `goods` WHERE `cat_one_id`='$one' AND `cat_two_id`='$two' GROUP BY `cat_three_id`";

  // 3. 操作数据库
  $link = mysqli_connect('127.0.0.1', 'root', '123456', 'xym_sql');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);

  // 4. 返回结果给前端
  $arr = array(
    "message" => "获取三级列表成功",
    "code" => 1,
    "list" => $data
  );

  echo json_encode($arr);


?>
