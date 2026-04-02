-- ============================================
-- 國一生物自主學習網站 - Supabase 資料表建立
-- 使用 bio_ 前綴避免與其他專案衝突
-- 在 Supabase Dashboard → SQL Editor 中執行
-- ============================================

-- 1. 學生資料表
create table bio_students (
  id text primary key,
  class_num text not null,
  name text not null,
  seat_num integer not null,
  birthday text default '',
  progress jsonb default '{"unit1":{},"unit2":{},"unit3":{}}',
  created_at timestamptz default now()
);

-- 如果資料表已存在，用這行加 birthday 欄位：
-- ALTER TABLE bio_students ADD COLUMN IF NOT EXISTS birthday text DEFAULT '';

-- 2. 設定資料表（存放測驗連結等）
create table bio_settings (
  id text primary key,
  unit1_test_link text default '',
  unit2_test_link text default '',
  unit3_test_link text default '',
  unit4_test_link text default '',
  unit5_test_link text default '',
  unit6_test_link text default '',
  updated_at timestamptz default now()
);

-- 3. 啟用 Row Level Security（RLS）
alter table bio_students enable row level security;
alter table bio_settings enable row level security;

-- 4. 設定存取政策：允許匿名讀寫（學校內部使用）
create policy "允許所有人讀取學生資料"
  on bio_students for select using (true);

create policy "允許所有人新增學生"
  on bio_students for insert with check (true);

create policy "允許所有人更新學生進度"
  on bio_students for update using (true);

create policy "允許所有人讀取設定"
  on bio_settings for select using (true);

create policy "允許所有人新增設定"
  on bio_settings for insert with check (true);

create policy "允許所有人更新設定"
  on bio_settings for update using (true);

-- 5. 建立索引加速查詢
create index idx_bio_students_class on bio_students (class_num);
create index idx_bio_students_class_seat on bio_students (class_num, seat_num);
