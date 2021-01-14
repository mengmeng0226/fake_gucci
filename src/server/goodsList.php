<?php

  $one = $_GET['cat_one'];
  $two = $_GET['cat_two'];
  $three = $_GET['cat_three'];
  $sort = $_GET['sort'];
  $sortType = $_GET['sortType'];
  $current = $_GET['current'];
  $pagesize = $_GET['pagesize'];

  // 2. 组装 sql 语句
  $sql = "SELECT * FROM `goods`";
  // 2-1. 组装一级分类
  if ($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
  // 2-2. 组装二级分类
  if ($two != 'all') $sql .= " AND `cat_two_id`='$two'";
  // 2-3. 组装三级分类
  if ($three != 'all') $sql .= " AND `cat_three_id`='$three'";

  $sql .= " ORDER BY `goods_$sort` $sortType";

  $start = ($current - 1) * $pagesize;
  $sql .= " LIMIT $start, $pagesize";

  // 3. 操作数据库
  $link = mysqli_connect('127.0.0.1', 'root', '123456', 'xym_sql');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  mysqli_close($link);

  // 4. 给前端返回数据
  $arr = array(
    "message" => "获取商品列表成功",
    "code" => 1,
    "list" => $data
  );

  echo json_encode($arr);


?>
