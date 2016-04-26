<?php
	
	class login_model extends CI_Model{


		function __construct(){
			parent::__construct();
		}

		function check_login($email,$password){
			$this->db->select('*');
			$this->db->from('tbl_user');
			$this->db->where('email',$email);
			$this->db->where('password',$password);

			return $this->db->get();

		}

		function getDetailData($user_id){
			$this->db->select('*');
			$this->db->from('tbl_user');
			$this->db->where('id_user',$user_id);

			return $this->db->get();
		}


		function UpdateProfileData($user_id , $data){
			$this->db->where('id_user',$user_id);
			$this->db->update('tbl_user',$data);
		}


		function getAllUser(){
			$this->db->select('*');
			$this->db->from('tbl_user');

			return $this->db->get();
		}


		function deleteUserData($user_id){
			$this->db->where('id_user',$user_id);
			$this->db->delete('tbl_user');

		}


		function insertNewUser($data){
			$this->db->insert('tbl_user',$data);
		}

	}

?>