Opensource (dev branch)

1. erxes/ui-ийн package.json болон yarn.lock 2 файлыг erxes-ui-хаар сольж тавина. package.json-оос erxes-ui мөрийг устгана.
2. remove erxes-ui from package.json
3. yarn install
4. git checkout package.json yarn.lock
5. yarn build
6. npm login (username: password:)
7. npm version
8. npm publish
9. CODE-оо заавал push хийх !!!!!!!!!!!!

Saas дээр erxes-ui болон erxes-api-utils 2-ийн хувьд дээрх үйлдэл давтагдана.

Warnings

а. Нэр нь өөр байна @erxes-аар эхэлсэн байна.
б. VERSION зөрж болно. package.json дээр update хийнэ гэсэн үг.
в. IMPORT-ууд дээр завсар хийнэ.
d. dev branch

1. git pull upstream dev
2. when conflict, accept current change of package.json, yarn.lock
   2.1 commit changes
3. replace yarn.lock, package.json with erxes/ui's
4. remove @erxes/erxes-ui from package.json
5. yarn install
6. git checkout package.json yarn.lock
7. yarn build
8. yarn publish (increase version)
