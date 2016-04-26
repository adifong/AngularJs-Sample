<?php 
	if(!defined('BASEPATH')) exit('cannot access !!');


	 class angular_controller extends CI_Controller{

	 	public function __construct(){
	 		parent::__construct();
	 		$this->load->helper('url');
			$this->load->library('session');

			$this->load->model('angular/login_model');


			

	 	}

	 	public function index(){
	 		$this->load->view('angular_new/index');
	 	}

	 	public function deleteUserData(){
	 		$user_id = $this->input->post('user_id');
	 		$this->login_model->deleteUserData($user_id);


	 	}


	 	public function logOut(){
	 		$this->session->set_userdata('logged_in', FALSE);
			$this->session->sess_destroy();
    		
    		$response['message'] = 'Success';
	        echo json_encode($response);



	 	}

	 	public function checkLogin(){

	 		$email = $this->input->post('email');
			$password = $this->input->post('password');

	 		$response['status'] = "Failed";
			$response['message'] = 'Logged in Failed.';


			$temp_Data = $this->login_model->check_login($email,$password)->row();
			$num_data = count($temp_Data);

			if ($num_data > 0){
				$response['status'] = "success";
				$response['message'] = 'Logged in successfully.';
				$response['nama_depan'] = $temp_Data->nama_depan;
				$response['nama_belakang'] = $temp_Data->nama_belakang;
				$response['email'] = $temp_Data->email;
				$response['id_user'] = $temp_Data->id_user;
				$response['logged_in'] = 1;

				$array_items = array(
					'id_user' => $temp_Data->id_user,
					'nama_depan' => $temp_Data->nama_depan,
					'nama_belakang' => $temp_Data->nama_belakang,
					'email' => $temp_Data->email,
					'logged_in' => true
				);
				$this->session->set_userdata($array_items);
				//redirect(site_url('account/account_ctl/dashboard'));
				$message = "Success";
			}
			else{
				$response['status'] = "Failed";
				$response['message'] = 'Logged in Failed.';
				//$message = "Username or password wrong!!";
				//$this->session->set_flashdata('notif_login', 'Username or password wrong!!');	
				
			}
			echo json_encode($response);
	 		
	 	}

	 	public function getAllUser(){

	 		$is_logged_in = $this->session->userdata('logged_in');
		   
	 		//echo $is_logged_in;
		   if($is_logged_in){
				$temp_Data = $this->login_model->getAllUser()->result();
				echo json_encode($temp_Data);
		   }
	 	}



	 	public function getDetailData(){


	 		$is_logged_in = $this->session->userdata('logged_in');
		   
	 		//echo $is_logged_in;
		   if($is_logged_in){
				$user_id = $this->input->post('user_id');
		 		$temp_Data = $this->login_model->getDetailData($user_id)->result();

		 		echo json_encode($temp_Data);
		   }

	 		

	 	}

	 	public function updateDataProfile(){

	 		$is_logged_in = $this->session->userdata('logged_in');
		   
	 		//echo $is_logged_in;
		   if($is_logged_in){
				$data['nama_depan'] =  $this->input->post('nama_depan');
		        $data['nama_belakang'] =  $this->input->post('nama_belakang');
		        //$data['email'] = $this->input->post('email');
		        $data['alamat'] =$this->input->post('alamat');
		        $data['notlp'] = $this->input->post('notlp');
		        $data['sex'] = $this->input->post('sex');
		        $user_id = $this->input->post('user_id');


		        $this->login_model->UpdateProfileData($user_id,$data);


		        $response['message'] = 'Success';
		        echo json_encode($response);
		   }
	 		
	 		


	 	}



	 	public function addNewUserCtrl(){
	 		$data['nama_depan'] =  $this->input->post('nama_depan');
	        $data['nama_belakang'] =  $this->input->post('nama_belakang');
	        $data['email'] = $this->input->post('email');
	        $data['password'] = $this->input->post('password');
	        $data['alamat'] =$this->input->post('alamat');
	        $data['notlp'] = $this->input->post('notlp');
	        $data['sex'] = $this->input->post('sex');

	        $this->login_model->insertNewUser($data);
	        $response['message'] = 'Success';
	        echo json_encode($response);

	 	}


	 }


?>