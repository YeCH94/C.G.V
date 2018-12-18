# C.G.V (Crowd Gachon Voting)

### Quick Link

[Root Component html](https://github.com/YeCH94/C.G.V/blob/master/src/app/app.component.html)

[Card Component html](https://github.com/YeCH94/C.G.V/blob/master/src/app/components/cards/cards.component.html)

[Navbar Component html](https://github.com/YeCH94/C.G.V/blob/master/src/app/components/navbar/navbar.component.html)

## Project Description

### Motivation

#### 기존 가천대학교 의견수렴 시스템의 문제점에 착안

> 1. 학교 홈페이지 내 '가천옴부즈'라는 의견 수렴 시스템이 존재하지만 많은 학생들이 존재 여부를 알지 못하고 개개인이 의견을 따로 제출하기 때문에 얼마나 많은 관심을 사안인지 처리는 어떻게 되고 있는지 알기 힘든 단점
>
> 2. 학교 대나무숲이나 에브리타임 게시판 활성화되어 있지만 공식적인 경로가 아니기 때문에 학교 측에서 답변해야할 의무가 없는 단점
>
> 3. 과 학생회부터 단계적으로 의견 수렴하여 최종적으로 학교에 제출하는 방안이 있지만 매우 느리고 복잡한 단계를 거쳐야 하는 단점
>

### C.G.V란?

> C.G.V는 Crowd Gachon Voting system을 의미합니다.
> 많은 학생들이 보다 나은 환경에서 학교 측에 의견을 내고
> 다른 학생들의 공감을 얻음으로써 학교 측의 답변을 보다 빠르게 들을 수 있습니다.

### 간략한 소개

- 학생들은 카테고리 별로 의견을 자유롭게 포스팅할 수 있습니다.
- 포스팅된 의견에 대해 공감/비공감을 표함으로써 의견을 지지하거나 반대할 수 있습니다.

## Key Feature

### 1. 실시간 반응형 웹

- Angular 프레임워크, Bootstrap을 이용하여 반응형 웹 구현
- Firebase Firestore를 데이터베이스로 사용하여 실시간으로 업데이트 되는 어플리케이션 구현

### 2. Like / Unlike

- 각 의견 포스트마다 `Like / Unlike`를 표시할 수 있어 어떤 의견이 많은 지지 혹은 반대를 받고 있는지 알 수 있습니다.

### 3. Hot Topics

- `Like`를 많이 받은 포스트를 표시해줌으로써 어떤 의견들이 많은 지지를 받고 있는지 알 수 있습니다.



------

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
